using Library.DTO;
using Library.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly LibraryDbContext Db;
        private readonly IWebHostEnvironment _hostEnvironment;
        public HomeController(LibraryDbContext _Db, IWebHostEnvironment hostEnvironment)
        {
            Db = _Db;
            _hostEnvironment = hostEnvironment;
        }
        [HttpGet]
        public IActionResult GetBooks()
        {
            
           var Book = Db.Books.ToList();
           List< HomeView> home = new List<HomeView>();
            foreach (var book in Book)
            {

                
                

                HomeView homeView = new HomeView()
                {
                    BookName = book.Name,
                    Rating = book.Rating,
                    Image = $"{Request.Scheme}://{Request.Host}/img/{book.Name}.jpg" ,
                    Description =book.BriefDescription
                };
                home.Add(homeView);
            }
            return Ok(home);
        }
        [HttpGet("book")]
        public IActionResult GetOneBook(string BookName)
        {
            var book = Db.Books.FirstOrDefault(a=>a.Name== BookName);
            if (book is null)
            {
                return NotFound();
            }
            else
            {
                BookDto bookFound = new BookDto()
                {
                    BookName = book.Name,
                    Rating = book.Rating,
                    Image = $"{Request.Scheme}://{Request.Host}/img/{book.Name}.jpg",
                    Description = book.BriefDescription ,
                    PDF = $"{Request.Scheme}://{Request.Host}/Books/{book.Name}.pdf" 
                };
                return Ok(bookFound);
            }
        }
        [HttpGet("Author")]
        public IActionResult GetBooksByAuthor(string authorName)
        {
            var AuthorandhisBooks = Db.Authors.Include(a => a.ListOfBooks).FirstOrDefault(a => a.Authorname == authorName);
            if (AuthorandhisBooks is null)
            {
                return NotFound();
            }
            else
            {
                List<HomeView> Authors = new List<HomeView>();
                foreach (var author in AuthorandhisBooks.ListOfBooks) {
                    HomeView books = new HomeView()
                    {
                        BookName = author.Name,
                        Rating = author.Rating,
                        Image = $"{Request.Scheme}://{Request.Host}/img/{author.Name}.jpg",
                        Description= author.BriefDescription 
                    };
                    Authors.Add(books);
                }
                return Ok(Authors);
            }
        }
        [HttpGet("Cataegory")]
        public IActionResult GetBooksByCataegory(string cataegoryName)
        {
            var Book = Db.Books.ToList();
            if (Book is null)
            {
                return NotFound();
            }
            else
            {
                List<HomeView> home = new List<HomeView>();
                foreach (var book in Book)
                {

                    if (book.Cataegory == cataegoryName)
                    {


                        HomeView homeView = new HomeView()
                        {
                            BookName = book.Name,
                            Rating = book.Rating,
                            Image = $"{Request.Scheme}://{Request.Host}/img/{book.Name}.jpg",
                            Description = book.BriefDescription
                        };
                        home.Add(homeView);
                    }
                }
                return Ok(home);
            }
        }
        [HttpGet("search")]
        public IActionResult GetBookByName(string BookName)
        {
            var book = Db.Books.FirstOrDefault(a=>a.Name== BookName);
            if (book is null)
            {
                return NotFound();
            }
            else
            {
                HomeView bookView = new HomeView()
                {
                    BookName = book.Name,
                    Rating = book.Rating,
                    Image = $"{Request.Scheme}://{Request.Host}/img/{book.Name}.jpg",
                    Description = book.BriefDescription
                };
                return Ok(bookView);
            }
        }
        [HttpGet("AllAuthors")]
        public IActionResult GetAllAuthors()
        {
            var GetAuths = Db.Authors.ToList();
            List<AllAuthorsDto> Authors = new List<AllAuthorsDto>();
            foreach (var auth in GetAuths)
            {
                AllAuthorsDto authorsDto = new AllAuthorsDto()
                {
                    AuthorName = auth.Authorname,
                    AuthorIMG = "link lsora"
                };
                Authors.Add(authorsDto);
            }
            return Ok(Authors);
        }
        

        //pdf
        //[HttpGet]
        //[Route("api/pdf/{filename}")]
        //public IActionResult GetPdf(string filename)
        //{
        //    // Get the path to the PDF file in the wwwroot folder
        //    string filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", filename);

        //    // Check if the file exists
        //    if (!System.IO.File.Exists(filePath))
        //    {
        //        return NotFound();
        //    }

        //    // Return the PDF file as a FileStreamResult
        //    var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
        //    var streamResult = new FileStreamResult(fileStream, "application/pdf");
        //    return streamResult;
        //}



    }
}
