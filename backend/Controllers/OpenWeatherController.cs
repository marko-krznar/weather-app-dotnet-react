using System.Security.Claims;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OpenWeatherController(IWeatherService weatherService) : ControllerBase
    {
        [HttpGet("current")]
        public async Task<IActionResult> GetCurrentWeather([FromQuery] double lat, [FromQuery] double lon, [FromQuery] string cityName)
        {
            try
            {
                int? userId = TryGetUserId(out int id) ? id : null;
                var content = await weatherService.GetCurrentWeatherAsync(lat, lon, cityName, userId);
                return Content(content, "application/json");
            }
            catch (HttpRequestException)
            {
                return StatusCode(500, "Greška s OpenWeather API-jem.");
            }
        }

        [HttpGet("forecast")]
        public async Task<IActionResult> GetWeatherForFiveDays([FromQuery] double lat, [FromQuery] double lon)
        {
            try
            {
                var content = await weatherService.GetWeatherForFiveDaysAsync(lat, lon);
                return Content(content, "application/json");
            }
            catch (HttpRequestException)
            {
                return StatusCode(500, "Greška s OpenWeather API-jem.");
            }
        }

        [HttpGet("geocode")]
        public async Task<IActionResult> GetCoordsByCityName([FromQuery] string q, [FromQuery] int limit = 1)
        {
            if (string.IsNullOrWhiteSpace(q)) return BadRequest("Ime grada je obavezno.");

            try
            {
                var locations = await weatherService.GetCoordsByCityNameAsync(q, limit);
                if (locations == null || locations.Count == 0)
                {
                    return NotFound(new { message = $"Grad '{q}' nije pronađen." });
                }
                return Ok(locations);
            }
            catch (HttpRequestException)
            {
                return StatusCode(500, "Greška pri dohvaćanju koordinata.");
            }
        }

        private bool TryGetUserId(out int userId)
        {
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? User.FindFirst("sub")?.Value;
            return int.TryParse(userIdStr, out userId);
        }
    }
}