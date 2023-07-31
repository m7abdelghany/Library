using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Library.Models
{
    public class Books
    {
        [Key]
        public int BookId { get; set; }
        public string Name { get; set; }
        public string Cataegory { get; set; }
        public string BriefDescription { get; set; }
        public float Rating { get; set; }
        public string ImgUrl { set; get; }

        public int AuthorId { get; set; }
        [ForeignKey("AuthorId")]
        public virtual Author Author { get; set; }
        public ICollection<FavBooks> FavBooks { get; set; }

    }
}

