using System.ComponentModel.DataAnnotations.Schema;

namespace Library.Models
{
    public class FavBooks
    {
        public string UserId { get; set; }
        public int BookId { get; set; }
        [ForeignKey("BookId")]
        public Books Books { get; set; }
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }
    }
}
