using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Entities
{
    [Table("Users")] // Eksplicitno kažemo EF-u da gleda tablicu 'Users'
    public class User
    {
        // Atributi [Column] ti više ne trebaju jer se nazivi svojstava (Id, Username, PasswordHash) 
        // točno i u slovo podudaraju s onima u DBeaveru!
        
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
    }
}