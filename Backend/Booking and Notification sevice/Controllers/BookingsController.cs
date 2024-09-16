using Booking_service.Models;
using Booking_service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Booking_service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly IBookingService _service;
        public BookingsController(IBookingService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<Booking>>> getAll()
        {
            return Ok(await _service.getAllBookings());
        }

        [HttpPost("mail")]
        public async Task<ActionResult<List<Booking>>> getByMail([FromBody] string email)
        {
            
            return Ok(await _service.getBookingsByUserEmail(email));
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult> updateStatus(int id, [FromBody] int status)
        {
            try
            {
                await _service.updateStatus(id, status);
                return Ok("Status updated");
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost]
        public async Task<ActionResult> add([FromBody] Booking booking)
        {
            await _service.AddBookings(booking);
            return Ok("Booking added");
        }
    }
}
