namespace Stats.Dtos
{
    public class SearchStatsDto
    {
        public List<TopCityDto> TopCities { get; set; } = new();
        public List<LatestSearchDto> LatestSearches { get; set; } = new();
        public List<ConditionDistributionDto> ConditionDistribution { get; set; } = new();
    }

    public class TopCityDto
    {
        public string City { get; set; } = string.Empty;
        public int Count { get; set; }
    }

    public class LatestSearchDto
    {
        public required int Id { get; set; }
        public string SearchTerm { get; set; } = string.Empty;
        public DateTime SearchedAt { get; set; }
        public double Temperature { get; set; }
        public double WindSpeed { get; set; }
        public double Pressure { get; set; }
        public string WeatherCondition { get; set; } = string.Empty;
    }

    public class ConditionDistributionDto {
        public string Condition { get; set; } = string.Empty;
        public int Count { get; set; }
 }}