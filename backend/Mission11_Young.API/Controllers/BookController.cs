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

        public IActionResult GetBooks(int pageHowMany = 5, int pageNum = 1)
        {
            var something = _context.Books
                .OrderBy(b => b.Title)
                .Skip((pageNum-1)*pageHowMany)
                .Take(pageHowMany)
                .ToList();
            
            var totalNumBooks = _context.Books.Count();

            var someObject = new
            {
                Books = something,
                TotalNumBooks = totalNumBooks
            };

            return Ok(someObject);
        }
    }
}
