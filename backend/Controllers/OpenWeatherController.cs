using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OpenWeatherController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

        public OpenWeatherController(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _apiKey = configuration["OpenWeatherSettings:ApiKey"]
                ?? throw new InvalidOperationException("Kritična greška: 'OpenWeatherSettings:ApiKey' nije konfiguriran u postavkama aplikacije!");
        }

        [HttpGet("current")]
        public async Task<IActionResult> GetCurrentWeather([FromQuery] double lat, [FromQuery] double lon)
        {
            if (string.IsNullOrEmpty(_apiKey))
            {
                return StatusCode(500, "API ključ nije konfiguriran na serveru.");
            }

            var url = $"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&lang=en&appid={_apiKey}";

            var response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, "Greška pri dohvaćanju podataka s OpenWeather API-ja.");
            }

            var content = await response.Content.ReadAsStringAsync();
            return Content(content, "application/json");
        }

        [HttpGet("forecast")]
        public async Task<IActionResult> GetWeatherForFiveDays([FromQuery] double lat, [FromQuery] double lon)
        {
            if (string.IsNullOrEmpty(_apiKey))
            {
                return StatusCode(500, "API ključ nije konfiguriran na serveru.");
            }

            var url = $"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=metric&lang=en&appid={_apiKey}";

            var response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, "Greška pri dohvaćanju podataka s OpenWeather API-ja.");
            }

            var content = await response.Content.ReadAsStringAsync();
            return Content(content, "application/json");
        }

        // [Authorize]
        [HttpGet("geocode")]
        public async Task<IActionResult> GetCoordsByCityName([FromQuery] string q, [FromQuery] int limit = 1)
        {
            if (string.IsNullOrEmpty(q))
            {
                return BadRequest("Ime grada je obavezno.");
            }

            if (string.IsNullOrEmpty(_apiKey))
            {
                return StatusCode(500, "API ključ nije konfiguriran na serveru.");
            }

            var url = $"https://api.openweathermap.org/geo/1.0/direct?q={Uri.EscapeDataString(q)}&limit={limit}&appid={_apiKey}";
            var response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, "Greška pri dohvaćanju koordinata.");
            }

            var content = await response.Content.ReadAsStringAsync();

            var locations = System.Text.Json.JsonSerializer.Deserialize<List<object>>(content);

            if (locations == null || locations.Count == 0)
            {
                return NotFound(new { message = $"Grad '{q}' nije pronađen." });
            }

            return Content(content, "application/json");
        }
    }
}