using System.Security.Claims;
using backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stats.Dtos;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SearchController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SearchController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("history")]
        public async Task<IActionResult> GetSearchHistory()
        {
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                            ?? User.FindFirst("sub")?.Value
                            ?? User.FindFirst("id")?.Value;

            if (!string.IsNullOrEmpty(userIdStr) && int.TryParse(userIdStr, out int userId))
            {
                var history = await _context.UserSearches
                    .Where(search => search.UserId == userId)
                    .OrderByDescending(search => search.SearchedAt)
                    .Select(search => new
                    {
                        search.Id,
                        search.SearchTerm,
                        search.SearchedAt,
                        search.Temperature,
                        search.WindSpeed,
                        search.Pressure,
                        search.WeatherCondition
                    })
                    .ToListAsync();

                return Ok(history);
            }

            return Unauthorized("Korisnik nije prepoznat.");
        }

        [HttpGet("stats")]
        public async Task<IActionResult> GetSearchStats()
        {
            var stats = await _context.UserSearches
                .GroupBy(s => 1)
                .Select(g => new
                {
                    TopCities = _context.UserSearches
                        .GroupBy(s => s.SearchTerm.ToLower())
                        .OrderByDescending(subG => subG.Count())
                        .Take(3)
                        .Select(subG => new TopCityDto
                        {
                            City = subG.Key,
                            Count = subG.Count()
                        })
                        .ToList(),

                    LatestSearches = _context.UserSearches
                        .OrderByDescending(s => s.SearchedAt)
                        .Take(3)
                        .Select(s => new LatestSearchDto
                        {
                            Id = s.Id,
                            SearchTerm = s.SearchTerm,
                            SearchedAt = s.SearchedAt,
                            Temperature = s.Temperature,
                            WindSpeed = s.WindSpeed,
                            Pressure = s.Pressure,
                            WeatherCondition = s.WeatherCondition
                        })
                        .ToList(),

                    ConditionDistribution = _context.UserSearches
                        .Where(s => !string.IsNullOrEmpty(s.WeatherCondition))
                        .GroupBy(s => s.WeatherCondition)
                        .Select(subG => new ConditionDistributionDto { Condition = subG.Key, Count = subG.Count() })
                        .ToList()
                })
                .FirstOrDefaultAsync();

            if (stats == null)
            {
                return Ok(new SearchStatsDto());
            }

            return Ok(new SearchStatsDto
            {
                TopCities = stats.TopCities,
                LatestSearches = stats.LatestSearches,
                ConditionDistribution = stats.ConditionDistribution
            });
        }
    }
}
