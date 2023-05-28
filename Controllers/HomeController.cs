using Library.DTO;
using Library.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
                    PDF = $"{Request.Scheme}://{Request.Host}/img/{book.Name}.pdf" 
                };
                return Ok(bookFound);
            }
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
