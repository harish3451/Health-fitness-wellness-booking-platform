
using Authentication_Serivce.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace Authentication_Serivce
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            
            builder.Services.AddDbContext<AuthdbContext>(
                options => { options.UseMySql(builder.Configuration.GetConnectionString("dbConnection"), ServerVersion.Parse("8.0.32-mysql"));
                    options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
                }
                );

            

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = "HealthHub",
                    ValidAudience ="HealthHub",
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF32.GetBytes("This-is-a-secret-key")),
                    NameClaimType = JwtRegisteredClaimNames.Name
                };
            });

            builder.Services.AddCors(options => {

                options.AddPolicy("EnableCORS", builder => {
                    builder.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod().WithMethods("POST","GET","PUT");
                }
            ); });

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseCors("EnableCORS");

            app.MapControllers();

            app.Run();
        }
    }
}
