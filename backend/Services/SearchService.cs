using backend.Data;
using Microsoft.EntityFrameworkCore;
using Stats.Dtos;

namespace backend.Services
{
    public class SearchService(AppDbContext context) : ISearchService
    {
        public async Task<(IEnumerable<object> Items, int TotalCount)> GetSearchHistoryAsync(int userId, int page, int limit)
        {
            var query = context.UserSearches.Where(search => search.UserId == userId);
            var totalCount = await query.CountAsync();

            var items = await query
                .OrderByDescending(search => search.SearchedAt)
                .Skip(page * limit)
                .Take(limit)
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

            return (items, totalCount);
        }

        public async Task<SearchStatsDto> GetSearchStatsAsync()
        {
            var stats = await context.UserSearches
                .GroupBy(s => 1)
                .Select(g => new
                {
                    TopCities = context.UserSearches
                        .GroupBy(s => s.SearchTerm.ToLower())
                        .OrderByDescending(subG => subG.Count())
                        .Take(3)
                        .Select(subG => new TopCityDto { City = subG.Key, Count = subG.Count() })
                        .ToList(),

                    LatestSearches = context.UserSearches
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

                    ConditionDistribution = context.UserSearches
                        .Where(s => !string.IsNullOrEmpty(s.WeatherCondition))
                        .GroupBy(s => s.WeatherCondition)
                        .Select(subG => new ConditionDistributionDto { Condition = subG.Key, Count = subG.Count() })
                        .ToList()
                })
                .FirstOrDefaultAsync();

            if (stats == null) return new SearchStatsDto();

            return new SearchStatsDto
            {
                TopCities = stats.TopCities,
                LatestSearches = stats.LatestSearches,
                ConditionDistribution = stats.ConditionDistribution
            };
        }
    }
}