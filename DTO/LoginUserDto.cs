using System.ComponentModel.DataAnnotations;

namespace Library.DTO
{
    public class LoginUserDto
    {
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
