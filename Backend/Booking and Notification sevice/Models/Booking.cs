using System.ComponentModel.DataAnnotations;

namespace Booking_service.Models
{
        
    

    public class Booking
    {
        static int count = 0;

        public Booking()
        {
            Id = count++;
        }

        [Key]
        public int Id { get; private set; }

        [Required]
        public string userEmail {  get; set; }
        [Required]
        public string companyName {  get; set; }

        [Required]
        public string serviceSelected { get; set; }
        [Required]
        public DateOnly AppointmentDate {  get; set; }
        [Required]  
        public string timeSlab {  get; set; }
        [Required]
        public int status {  get; set; }
    }
}
