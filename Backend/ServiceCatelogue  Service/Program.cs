
using Microsoft.EntityFrameworkCore;
using ServiceCatelogue__Service.Models;
using ServiceCatelogue__Service.Repository;
using ServiceCatelogue__Service.Services;

namespace ServiceCatelogue__Service
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddDbContext<ServicedbContext>(
                options => {
                    options.UseMySql(builder.Configuration.GetConnectionString("dbConnection"), ServerVersion.Parse("8.0.32-mysql"));
                    options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
                }
                );

            builder.Services.AddScoped<IServiceRepository, ServiceRepository>();
            builder.Services.AddScoped<IService, Service>();
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(options => {

                options.AddPolicy("EnableCORS", builder => {
                    builder.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod().WithMethods("POST", "GET", "PUT","PATCH","DELETE");
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
