using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using ServiceCatelogue__Service.Exception;
using ServiceCatelogue__Service.Models;

namespace ServiceCatelogue__Service.Repository
{
    public class ServiceRepository : IServiceRepository
    {
        private readonly ServicedbContext _context;
        public ServiceRepository(ServicedbContext context)
        {
            _context = context;
        }
        public async Task AddCompanyAsync(ServiceDetails details)
        {
            _context.serviceDetails.Add(details);
            _context.SaveChanges();
        }

        public async Task DeleteServiceAsync(int id)
        {
            var s = await _context.serviceDetails.FindAsync(id);
            if (s == null) 
            {
                throw new CompanyNotFoundException(id);
            }
            _context.serviceDetails.Remove(s);
            _context.SaveChanges();
        }

        public async Task<IEnumerable<ServiceDetails>> GetAllAsync()
        {
            return await _context.serviceDetails.ToListAsync<ServiceDetails>();
        }

        public async Task<ServiceDetails> GetById(int id)
        {
            var s = await _context.serviceDetails.FindAsync(id);
            if (s == null)
            {
                throw new CompanyNotFoundException(id);
            }
            return s;
        }

        public async Task<ServiceDetails> GetByMail(string mail)
        {
            return await _context.serviceDetails.Where(d => d.CompanyEmail == mail).SingleOrDefaultAsync<ServiceDetails>();
        }

        public async Task UpdateServiceAsync(ServiceDetails details)
        {
            _context.serviceDetails.Update(details);
            _context.SaveChanges();
        }
    }
}
