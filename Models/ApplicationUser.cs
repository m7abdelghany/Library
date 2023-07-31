using Microsoft.AspNetCore.Identity;

namespace Library.Models
{
    public class ApplicationUser:IdentityUser
    {
        public string Gender { get; set; }
        public string ImgUrl { get; set; }
        public int Age { get; set; }
        public string ImgExten { get; set; }
        
        public ICollection<FavBooks> FavBooks { get; set; }
    }
}
