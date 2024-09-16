using Booking_service.Models;

namespace Booking_service.Services
{
    public interface IBookingService
    {
        Task<List<Booking>> getAllBookings();
        Task<List<Booking>> getBookingsByUserEmail(string email);
        Task updateStatus(int id,int status);
        Task AddBookings(Booking booking);
    }
}
