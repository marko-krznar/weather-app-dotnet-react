using System.Security.Claims;
using backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private readonly AppDbContext _context;

        public SearchController(HttpClient httpClient, IConfiguration configuration, AppDbContext context)
        {
            _httpClient = httpClient;
            _context = context;
            _apiKey = configuration["OpenWeatherSettings:ApiKey"]
                ?? throw new InvalidOperationException("Kritična greška: 'OpenWeatherSettings:ApiKey' nije konfiguriran!");
        }

        [Authorize]
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
                        search.SearchedAt
                    })
                    .ToListAsync();

                return Ok(history);
            }

            return Unauthorized("Korisnik nije prepoznat.");
        }
    }
}
