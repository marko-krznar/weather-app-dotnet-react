using System;

namespace backend.Entities
{
    public class UserSearch
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string SearchTerm { get; set; } = string.Empty;
        public DateTime SearchedAt { get; set; } = DateTime.UtcNow;
        public User? User { get; set; }
    }
}