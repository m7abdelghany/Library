using Library.DTO;
using Library.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace Library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly LibraryDbContext Db;
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly UserManager<ApplicationUser> userManager;
        public HomeController(LibraryDbContext _Db, IWebHostEnvironment hostEnvironment, UserManager<ApplicationUser> _userManager)
        {
            Db = _Db;
            _hostEnvironment = hostEnvironment;
            this.userManager = _userManager;
        }
        [HttpGet]
        public IActionResult GetBooks()
        {

            var Book = Db.Books.ToList();
            List<HomeView> home = new List<HomeView>();
            foreach (var book in Book)
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
            return Ok(home);
        }
        [HttpGet("book")]
        public IActionResult GetOneBook(string BookName)
        {
            var book = Db.Books.FirstOrDefault(a => a.Name == BookName);
            if (book is null)
            {
                return NotFound();
            }
            else
            {
                var Author = Db.Authors.FirstOrDefault(a => a.Authorid == book.AuthorId);
                BookDto bookFound = new BookDto()
                {
                    BookName = book.Name,
                    Rating = book.Rating,
                    Image = $"{Request.Scheme}://{Request.Host}/img/{book.Name}.jpg",
                    Description = book.BriefDescription,
                    PDF = $"{Request.Scheme}://{Request.Host}/Books/{book.Name}.pdf",
                    BookAuthor = Author.Authorname ,
                    BookCate = book.Cataegory
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
                foreach (var author in AuthorandhisBooks.ListOfBooks)
                {
                    HomeView books = new HomeView()
                    {
                        BookName = author.Name,
                        Rating = author.Rating,
                        Image = $"{Request.Scheme}://{Request.Host}/img/{author.Name}.jpg",
                        Description = author.BriefDescription
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
            var book = Db.Books.FirstOrDefault(a => a.Name == BookName);
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
        [Authorize]
        [HttpPost("Like")]
        public IActionResult LikeBooks(FavBookDto fav)
        {
            if (fav.BookName is not null)
            {
                string BookName = fav.BookName;
                var Book = Db.Books.FirstOrDefault(a => a.Name == BookName);
                if (Book is not null)
                {
                    int BookId = Book.BookId;
                    string UserID = userManager.GetUserId(User);


                    FavBooks AddBook = new FavBooks()
                    {
                        BookId = BookId,
                        UserId = UserID,
                    };
                    Db.FavBooks.Add(AddBook);
                    Db.SaveChanges();
                    return Ok();
                }
                else return NotFound("book is not existed");
            }
            else { return BadRequest("you must send book name"); }


        }
        [Authorize]
        [HttpDelete("RemoveLike")]
        public IActionResult RemoveLIkedBook(FavBookDto fav)
        {
            if (fav.BookName is not null)
            {
                string BookName = fav.BookName;
                var Book = Db.Books.FirstOrDefault(a => a.Name == BookName);
                if (Book is not null)
                {

                    int BookId = Book.BookId;
                    string UserID = userManager.GetUserId(User);
                    var FavBook = Db.FavBooks.FirstOrDefault(a => a.BookId == BookId);
                    if (FavBook is not null)
                    {

                        Db.FavBooks.Remove(FavBook);
                        Db.SaveChanges();
                        return Ok();
                    }
                    else return BadRequest("book is not in favourite");
                }
                else return NotFound("book is not existed");
            }
            else { return BadRequest("you must send book name"); }


        }
        [Authorize]
        [HttpGet("AllfavBooks")]
        public IActionResult GetAllFavBooks()
        {
            string UserID = userManager.GetUserId(User);
            var Books = Db.FavBooks.Where(a => a.UserId == UserID);
            if (Books is not null)
            {
                List<ShowFavBookDto> FavBook = new List<ShowFavBookDto>();
                foreach (var item in Books)
                {
                    var Book = Db.Books.FirstOrDefault(a => a.BookId == item.BookId);
                    if (Book is not null)
                    {
                        ShowFavBookDto favBook = new ShowFavBookDto()
                        {
                            BookName = Book.Name,
                            Img = $"{Request.Scheme}://{Request.Host}/img/{Book.Name}.jpg"
                        };
                        FavBook.Add(favBook);
                        
                    }
                    else { return Ok(); }

                }
                return Ok(FavBook);
            }
            else { return NotFound("no book in favourites"); }
        }




    }
}

