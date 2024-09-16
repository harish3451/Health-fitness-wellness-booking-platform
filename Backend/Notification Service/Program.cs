
using MailKit;
using Microsoft.Extensions.Options;
using Notification_Service.Models;
using Notification_Service.Services;

namespace Notification_Service
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
            builder.Services.Configure<MailSetting>(builder.Configuration.GetSection("MailSetting"));
            builder.Services.AddSingleton<ApiMailService>();
            builder.Services.AddHttpClient("MailTrapApiClient", (services, client) =>
            {
                var mailSetting = services.GetRequiredService<IOptions<MailSetting>>().Value;
                client.BaseAddress = new Uri(mailSetting.ApiBaseUrl);
                client.DefaultRequestHeaders.Add("Api-Token", mailSetting.ApiToken);
            });

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
            app.UseHttpsRedirection();
            app.UseAuthorization();

            app.UseCors("EnableCORS");
            app.MapControllers();

            app.Run();
        }
    }
}
