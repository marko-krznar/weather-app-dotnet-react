using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class UserDto
    {
        [Required]
        public string Username { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
        [Required]
        [EmailAddress(ErrorMessage = "Unesena e-mail adresa nije valjana.")]
        public string Email { get; set; } = string.Empty;
    }
}