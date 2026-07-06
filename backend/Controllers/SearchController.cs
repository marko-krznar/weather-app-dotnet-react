using System.Security.Claims;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SearchController(ISearchService searchService) : ControllerBase
    {
        [HttpGet("history")]
        public async Task<IActionResult> GetSearchHistory([FromQuery] int page = 0, [FromQuery] int limit = 10)
        {
            if (TryGetUserId(out int userId))
            {
                var (items, totalCount) = await searchService.GetSearchHistoryAsync(userId, page, limit);
                return Ok(new { items, totalCount });
            }

            return Unauthorized("Korisnik nije prepoznat.");
        }

        [HttpGet("stats")]
        public async Task<IActionResult> GetSearchStats()
        {
            var stats = await searchService.GetSearchStatsAsync();
            return Ok(stats);
        }

        private bool TryGetUserId(out int userId)
        {
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                            ?? User.FindFirst("sub")?.Value
                            ?? User.FindFirst("id")?.Value;

            return int.TryParse(userIdStr, out userId);
        }
    }
}