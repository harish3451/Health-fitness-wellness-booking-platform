using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Authentication_Serivce.Models
{
    public class AuthdbContext:DbContext
    {
        public AuthdbContext(DbContextOptions<AuthdbContext> options):base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<User> Users { get;set; }
    }
}
