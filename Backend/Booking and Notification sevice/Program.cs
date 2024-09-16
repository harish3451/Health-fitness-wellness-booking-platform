
using Booking_service.Models;
using Booking_service.Services;

namespace Booking_sevice
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.Configure<DBsetting>(
                builder.Configuration.GetSection("database"));
            builder.Services.AddScoped<IBookingService,BookingService>();

            builder.Services.AddCors(options => {

                options.AddPolicy("EnableCORS", builder => {
                    builder.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod().WithMethods("POST", "GET", "PUT");
                }
            );
            });
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseAuthorization();
            app.UseCors("EnableCORS");

            app.MapControllers();

            app.Run();
        }
    }
}
