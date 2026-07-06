using backend.Models;
using Stats.Dtos;

namespace backend.Services
{
    public interface ISearchService
    {
        Task<(IEnumerable<object> Items, int TotalCount)> GetSearchHistoryAsync(int userId, int page, int limit);
        Task<SearchStatsDto> GetSearchStatsAsync();
    }
}