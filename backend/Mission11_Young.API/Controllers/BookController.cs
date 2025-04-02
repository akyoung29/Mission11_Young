using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mission11_Young.API.Data;

namespace Mission11_Young.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _context;

        public BookController(BookDbContext temp)
        {
            _context = temp;
        }

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, [FromQuery] List<string>? bookCategories = null, string sortOrder = "asc")
        {
            var query = _context.Books.AsQueryable();

            if (bookCategories != null && bookCategories.Any())
            {
                query = query.AsQueryable().Where(b => bookCategories.Contains(b.Category));
            }
            

            // Sort by title based on the sortOrder
            if (sortOrder.ToLower() == "desc")
            {
                query = query.OrderByDescending(b => b.Title);
            }
            else
            {
                query = query.OrderBy(b => b.Title);
            }

            var something = query
                .Skip((pageNum-1)*pageSize)
                .Take(pageSize)
                .ToList();
            
            var totalNumBooks = query.Count();

            var someObject = new
            {
                Books = something,
                TotalNumBooks = totalNumBooks
            };

            return Ok(someObject);
        }

        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories ()
        {
            var bookCategories = _context.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(bookCategories);
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _context.Books.Add(newBook);
            _context.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{bookID}")]
        public IActionResult UpdateBook(int bookID, [FromBody] Book updateBook)
        {
            var existingBook = _context.Books.Find(bookID);

            existingBook.Title = updateBook.Title;
            existingBook.Author = updateBook.Author;
            existingBook.Publisher = updateBook.Publisher;
            existingBook.ISBN = updateBook.ISBN;
            existingBook.Classification = updateBook.Classification;
            existingBook.Category = updateBook.Category;
            existingBook.PageCount = updateBook.PageCount;
            existingBook.Price = updateBook.Price;

            _context.Books.Update(existingBook);
            _context.SaveChanges();

            return Ok(existingBook);
        }

        [HttpDelete("DeleteBook/{bookID}")]
        public IActionResult DeleteBook(int bookID)
        {
            var book = _context.Books.Find(bookID);

            if (book == null)
            {
                return NotFound(new { message = "Book not found" });
            }

            _context.Books.Remove(book);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
