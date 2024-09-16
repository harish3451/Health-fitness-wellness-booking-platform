using Booking_service.Controllers;
using Booking_service.Models;
using Booking_service.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackEnd_API_test.BookingService_Test
{
    public class ControllerTest
    {
        private readonly Mock<IBookingService> _booking;
        private readonly BookingsController controller;

        public ControllerTest()
        {
            _booking = new Mock<IBookingService>();
            controller = new BookingsController(_booking.Object);
        }

        [Fact]
        public async Task getAllBookings()
        {
            var bookings = new List<Booking>()
            {
                new Booking{AppointmentDate=new DateOnly(2024,09,03),companyName="FitGym",serviceSelected="Training",status=0,timeSlab="1pm-3pm",userEmail="user1@gmail.com"
                }
            };
             _booking.Setup(service => service.getAllBookings()).ReturnsAsync(bookings);
            var result = await controller.getAll();

            Assert.IsType<OkObjectResult>(result.Result);
        }

        [Fact]
        public async Task get_Bookings_By_Mail()
        {
            var bookings = new List<Booking>()
            {
                new Booking{AppointmentDate=new DateOnly(2024,09,03),companyName="FitGym",serviceSelected="Training",status=0,timeSlab="1pm-3pm",userEmail="user1@gmail.com"},
                new Booking{AppointmentDate=new DateOnly(2024,09,03),companyName="FitGym",serviceSelected="Training",status=0,timeSlab="1pm-3pm",userEmail="user1@gmail.com"}
            };
             List<Booking> bookingWithMail= bookings.FindAll(x => x.userEmail == "user1@gmail.com");
            _booking.Setup(service=>service.getBookingsByUserEmail("user1@gmail.com")).ReturnsAsync(bookingWithMail);

            var result = await controller.getByMail("user1@gmail.com");

            Assert.IsType<OkObjectResult>(result.Result);
        }

        [Fact]
        public async Task Update_Booking_Status()
        {
            var bookings = new List<Booking>()
            {
                new Booking{AppointmentDate=new DateOnly(2024,09,03),companyName="FitGym",serviceSelected="Training",status=0,timeSlab="1pm-3pm",userEmail="user1@gmail.com"},
                new Booking{AppointmentDate=new DateOnly(2024,09,03),companyName="FitGym",serviceSelected="Training",status=0,timeSlab="1pm-3pm",userEmail="user1@gmail.com"}
            };
            _booking.Setup(s => s.updateStatus(1, 3)).Returns(Task.CompletedTask);
            
            var result = await controller.updateStatus(1, 3);

            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task Add_Booking()
        {
            var booking = new Booking {  AppointmentDate = new DateOnly(2024, 09, 03), companyName = "FitGym", serviceSelected = "Training", status = 0, timeSlab = "1pm-3pm", userEmail = "user1@gmail.com" };
            _booking.Setup(s=>s.AddBookings(booking)).Returns(Task.CompletedTask);  

            var result = await controller.add(booking);

            Assert.IsType<OkObjectResult>(result);
        }
    }
}
