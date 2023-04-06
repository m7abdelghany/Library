using Library.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly LibraryDbContext Db;
        public BooksController(LibraryDbContext _Db)
        {
            Db = _Db;
        }

        [HttpGet]
        public IActionResult GetAllBooks()
        {
            List<Books> books = Db.Books.ToList();
            return Ok(books);
        }

        
    }
}
