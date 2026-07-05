using System;

namespace backend.Entities
{
    public class UserSearch
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string SearchTerm { get; set; } = string.Empty;
        public DateTime SearchedAt { get; set; } = DateTime.UtcNow;
        public double Temperature { get; set; }
        public double WindSpeed { get; set; }
        public double Pressure { get; set; }
        public string WeatherCondition { get; set; } = string.Empty;
        public User? User { get; set; }
    }
}