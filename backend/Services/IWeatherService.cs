using backend.Models;

namespace backend.Services
{
    public interface IWeatherService
    {
        Task<string> GetCurrentWeatherAsync(double lat, double lon, int? userId);
        Task<string> GetWeatherForFiveDaysAsync(double lat, double lon);
        Task<List<GeoLocationDto>?> GetCoordsByCityNameAsync(string q, int limit);
    }
}