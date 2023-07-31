using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Library.Models
{
    public class Author
    {
        [Key]
        public int Authorid { get; set; }
        public string Authorname { get; set; }
        public string? Describtion { get; set; }
        public string? Label { get; set; }

        public virtual ICollection<Books> ListOfBooks { get; set; }
    }
}
