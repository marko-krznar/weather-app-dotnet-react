using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Data;
using backend.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Nodes;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OpenWeatherController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private readonly AppDbContext _context;
        private readonly ILogger<OpenWeatherController> _logger;

        public OpenWeatherController(HttpClient httpClient, IConfiguration configuration, AppDbContext context, ILogger<OpenWeatherController> logger)
        {
            _httpClient = httpClient;
            _context = context;
            _logger = logger;
            _apiKey = configuration["OpenWeatherSettings:ApiKey"]
                ?? throw new InvalidOperationException("Kritična greška: 'OpenWeatherSettings:ApiKey' nije konfiguriran!");
                
        }

        [HttpGet("current")]
        public async Task<IActionResult> GetCurrentWeather([FromQuery] double lat, [FromQuery] double lon, [FromQuery] string cityName)
        {
            if (string.IsNullOrEmpty(_apiKey)) return StatusCode(500, "API ključ nije konfiguriran.");

            var url = $"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&lang=en&appid={_apiKey}";
            var response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode) return StatusCode((int)response.StatusCode, "Greška s OpenWeather API-jem.");

            var content = await response.Content.ReadAsStringAsync();

            await LogUserSearchAsync(cityName, content);

            return Content(content, "application/json");
        }

        private async Task LogUserSearchAsync(string cityName, string weatherJson)
        {
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value 
                            ?? User.FindFirst("sub")?.Value;

            if (!string.IsNullOrEmpty(userIdStr) && int.TryParse(userIdStr, out int userId))
            {
                try
                {
                    var json = JsonNode.Parse(weatherJson);
                    
                    var searchLog = new UserSearch
                    {
                        UserId = userId,
                        SearchTerm = cityName ?? json?["name"]?.ToString() ?? "Nepoznato",
                        SearchedAt = DateTime.UtcNow,
                        Temperature = json?["main"]?["temp"]?.GetValue<double>() ?? 0,
                        Pressure = json?["main"]?["pressure"]?.GetValue<double>() ?? 0,
                        WindSpeed = json?["wind"]?["speed"]?.GetValue<double>() ?? 0,
                        WeatherCondition = json?["weather"]?[0]?["main"]?.ToString() ?? "Unknown"
                    };

                    _context.UserSearches.Add(searchLog);
                    await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Greška pri spremanju pretrage u bazu.");
                }
            }
        }

        [HttpGet("forecast")]
        public async Task<IActionResult> GetWeatherForFiveDays([FromQuery] double lat, [FromQuery] double lon)
        {
            if (string.IsNullOrEmpty(_apiKey)) return StatusCode(500, "API ključ nije konfiguriran.");

            var url = $"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=metric&lang=en&appid={_apiKey}";
            var response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode) return StatusCode((int)response.StatusCode, "Greška s OpenWeather API-jem.");

            var content = await response.Content.ReadAsStringAsync();
            return Content(content, "application/json");
        }

        [HttpGet("geocode")]
        public async Task<IActionResult> GetCoordsByCityName([FromQuery] string q, [FromQuery] int limit = 1)
        {
            if (string.IsNullOrWhiteSpace(q)) return BadRequest("Ime grada je obavezno.");
            if (string.IsNullOrEmpty(_apiKey)) return StatusCode(500, "API ključ nije konfiguriran.");

            q = q.Trim();
            var url = $"https://api.openweathermap.org/geo/1.0/direct?q={Uri.EscapeDataString(q)}&limit={limit}&appid={_apiKey}";
            var response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode) return StatusCode((int)response.StatusCode, "Greška pri dohvaćanju koordinata.");

            var content = await response.Content.ReadAsStringAsync();

            var options = new System.Text.Json.JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            var locations = System.Text.Json.JsonSerializer.Deserialize<List<GeoLocationDto>>(content, options);

            if (locations == null || locations.Count == 0)
            {
                return NotFound(new { message = $"Grad '{q}' nije pronađen." });
            }

            return Ok(locations);
        }
    }
}