using ServiceCatelogue__Service.Models;
using ServiceCatelogue__Service.Repository;

namespace ServiceCatelogue__Service.Services
{
    public class Service : IService
    {
        private readonly IServiceRepository _serviceRepo;

        public Service( IServiceRepository repo)
        {
            _serviceRepo = repo;
        }
        public async Task AddCompanyAsync(ServiceDetails details)
        {
            await _serviceRepo.AddCompanyAsync(details);
        }

        public async Task DeleteServiceAsync(int id)
        {
            await _serviceRepo.DeleteServiceAsync(id);
        }

        public async Task<IEnumerable<ServiceDetails>> GetAllAsync()
        {
            return await _serviceRepo.GetAllAsync();    
        }

        public Task<ServiceDetails> GetById(int id)
        {
            return _serviceRepo.GetById(id);
        }

        public async Task<ServiceDetails> GetByMail(string mail)
        {
            return await _serviceRepo.GetByMail(mail);
        }

        public async Task UpdateServiceAsync(ServiceDetails details)
        {
            await _serviceRepo.UpdateServiceAsync(details);
        }
    }
}
