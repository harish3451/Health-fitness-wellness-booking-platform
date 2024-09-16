using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;

namespace ServiceCatelogue__Service.Models
{
    public class ServicedbContext:DbContext
    {
        public ServicedbContext(DbContextOptions<ServicedbContext> options):base(options) 
        {
            
        }

        public DbSet<ServiceDetails> serviceDetails { get; set; }   
    }
}
