using Microsoft.EntityFrameworkCore;

namespace Library.Models
{
    public class LibraryDbContext:DbContext
    {
        public LibraryDbContext()
        {

        }
        public LibraryDbContext(DbContextOptions options):base(options)
        {

        }
        public DbSet<Books> Books { get; set; }
        
    }
}
