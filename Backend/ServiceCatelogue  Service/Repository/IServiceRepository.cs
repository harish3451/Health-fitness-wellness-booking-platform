using ServiceCatelogue__Service.Models;

namespace ServiceCatelogue__Service.Repository
{
    public interface IServiceRepository
    {
        Task<IEnumerable<ServiceDetails>> GetAllAsync();
        Task UpdateServiceAsync(ServiceDetails details);

        Task DeleteServiceAsync(int id);
        Task AddCompanyAsync(ServiceDetails details);
        Task<ServiceDetails> GetByMail(string mail);

        Task<ServiceDetails> GetById(int id);
    }
}
