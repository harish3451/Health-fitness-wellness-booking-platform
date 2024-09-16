using Booking_service.Models;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Booking_service.Services
{
    public class BookingService : IBookingService
    {

        private readonly IMongoCollection<Booking> _bookings;
        public BookingService()
        {
            
        }
        public BookingService(IOptions<DBsetting> dbsetting)
        {
            var mongoClient = new MongoClient(dbsetting.Value.connectionString);

            var mongoDatabase = mongoClient.GetDatabase(dbsetting.Value.databaseName);

            _bookings = mongoDatabase.GetCollection<Booking>(dbsetting.Value.collectionName);
        }

        public async Task AddBookings(Booking booking)
        {
            await _bookings.InsertOneAsync(booking);
        }

        public async Task<List<Booking>> getAllBookings()
        {
            return await _bookings.Find(_=>true).ToListAsync<Booking>();
        }

        public async Task<List<Booking>> getBookingsByUserEmail(string email)
        {
            return await _bookings.Find(d=>d.userEmail== email).ToListAsync<Booking>(); 
        }

        

        public async Task updateStatus(int id , int status)
        {
            var bookings = await _bookings.Find(d=>d.Id == id).FirstOrDefaultAsync();
            if(bookings == null)
            {
                throw new ApplicationException("Id not found in database");
            }
            bookings.status = status;
            await _bookings.ReplaceOneAsync(d=>d.Id==id,bookings); 
        }

        
    }
}
