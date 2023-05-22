using System.ComponentModel.DataAnnotations;

namespace Library.DTO
{
    public class RegisterUserDto
    {
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
        [Compare("Password")]
        public string ConfirmPassword { get; set; }

        public string Email { get; set; }
        public string Gender { get; set; }
        public string Phone { get; set; }
        public string ImgUrl { get; set; }
        public int Age { get; set; }
    }
}
