using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Data;
using backend.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Osigurava da su sve rute zaštićene i da token mora biti poslan
    public class OpenWeatherController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private readonly AppDbContext _context;

        public OpenWeatherController(HttpClient httpClient, IConfiguration configuration, AppDbContext context)
        {
            _httpClient = httpClient;
            _context = context;
            _apiKey = configuration["OpenWeatherSettings:ApiKey"]
                ?? throw new InvalidOperationException("Kritična greška: 'OpenWeatherSettings:ApiKey' nije konfiguriran!");
        }

        [HttpGet("current")]
        public async Task<IActionResult> GetCurrentWeather([FromQuery] double lat, [FromQuery] double lon)
        {
            if (string.IsNullOrEmpty(_apiKey)) return StatusCode(500, "API ključ nije konfiguriran.");

            var url = $"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&lang=en&appid={_apiKey}";
            var response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode) return StatusCode((int)response.StatusCode, "Greška s OpenWeather API-jem.");

            var content = await response.Content.ReadAsStringAsync();
            return Content(content, "application/json");
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
            if (string.IsNullOrEmpty(q)) return BadRequest("Ime grada je obavezno.");
            if (string.IsNullOrEmpty(_apiKey)) return StatusCode(500, "API ključ nije konfiguriran.");

            var url = $"https://api.openweathermap.org/geo/1.0/direct?q={Uri.EscapeDataString(q)}&limit={limit}&appid={_apiKey}";
            var response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode) return StatusCode((int)response.StatusCode, "Greška pri dohvaćanju koordinata.");

            var content = await response.Content.ReadAsStringAsync();

            // Provjera vraća li OpenWeather stvarne lokacije
            var locations = System.Text.Json.JsonSerializer.Deserialize<List<object>>(content);
            if (locations == null || locations.Count == 0)
            {
                return NotFound(new { message = $"Grad '{q}' nije pronađen." });
            }

            // TEK SADA spremamo pretragu u bazu jer znamo da grad postoji
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value 
                            ?? User.FindFirst("sub")?.Value
                            ?? User.FindFirst("id")?.Value;

            if (!string.IsNullOrEmpty(userIdStr) && int.TryParse(userIdStr, out int userId))
            {
                try
                {
                    var searchLog = new UserSearch
                    {
                        UserId = userId,
                        SearchTerm = q.Trim(),
                        SearchedAt = DateTime.UtcNow
                    };
                    _context.UserSearches.Add(searchLog);
                    await _context.SaveChangesAsync();
                    Console.WriteLine($"[BAZA] Pretraga uspješno spremljena za User ID: {userId}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"[BAZA GREŠKA] Greška pri spremanju pretrage: {ex.Message}");
                }
            }
            else
            {
                Console.WriteLine($"[BAZA UPOZORENJE] Korisnikov ID nije pronađen u tokenu! Vrijednost u claimu je: '{userIdStr}'");
            }

            return Content(content, "application/json");
        }
    }
}