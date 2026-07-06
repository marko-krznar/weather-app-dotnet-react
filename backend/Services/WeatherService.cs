using System.Text.Json;
using System.Text.Json.Nodes;
using backend.Data;
using backend.Entities;
using backend.Models;

namespace backend.Services
{
    public class WeatherService : IWeatherService
    {
        private readonly HttpClient _httpClient;
        private readonly AppDbContext _context;
        private readonly ILogger<WeatherService> _logger;
        private readonly string _apiKey;

        public WeatherService(HttpClient httpClient, IConfiguration configuration, AppDbContext context, ILogger<WeatherService> logger)
        {
            _httpClient = httpClient;
            _context = context;
            _logger = logger;
            _apiKey = configuration["OpenWeatherSettings:ApiKey"] 
                ?? throw new InvalidOperationException("Kritična greška: 'OpenWeatherSettings:ApiKey' nije konfiguriran!");
        }

        public async Task<string> GetCurrentWeatherAsync(double lat, double lon, int? userId)
        {
            var url = $"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&lang=en&appid={_apiKey}";
            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();

            if (userId.HasValue)
            {
                await LogUserSearchAsync(userId.Value, content);
            }

            return content;
        }

        public async Task<string> GetWeatherForFiveDaysAsync(double lat, double lon)
        {
            var url = $"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=metric&lang=en&appid={_apiKey}";
            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            return await response.Content.ReadAsStringAsync();
        }

        public async Task<List<GeoLocationDto>?> GetCoordsByCityNameAsync(string q, int limit)
        {
            var url = $"https://api.openweathermap.org/geo/1.0/direct?q={Uri.EscapeDataString(q.Trim())}&limit={limit}&appid={_apiKey}";
            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<List<GeoLocationDto>>(content, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }

        private async Task LogUserSearchAsync(int userId, string weatherJson)
        {
            _logger.LogInformation("Primljeni JSON s API-ja: {Json}", weatherJson);
            try
            {
                var json = JsonNode.Parse(weatherJson);
                var searchLog = new UserSearch
                {
                    UserId = userId,
                    SearchTerm = json?["name"]?.ToString() ?? "Nepoznato",
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
}