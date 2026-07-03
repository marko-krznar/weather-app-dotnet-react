using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class LoginUserDto
    {
        [Required]
        public string UsernameOrEmail { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }
}