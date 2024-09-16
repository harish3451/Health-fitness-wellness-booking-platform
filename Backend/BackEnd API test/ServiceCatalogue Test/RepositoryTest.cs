using Microsoft.EntityFrameworkCore;
using ServiceCatelogue__Service.Exception;
using ServiceCatelogue__Service.Models;
using ServiceCatelogue__Service.Repository;

namespace BackEnd_API_test.ServiceCatalogue_Test
{
    public class RepoitoryTest
    {
        private readonly DbContextOptions<ServicedbContext> _options;
        public RepoitoryTest()
        {
            _options = new DbContextOptionsBuilder<ServicedbContext>().UseInMemoryDatabase(databaseName:"CompanyDetails").Options;

            
            var details = new ServiceDetails
            {
                id = 3,
                CompanyEmail = "info@Company.com",
                CompanyName = "Surat clinic",
                CompanyPhone = "9876549875",
                Location = "Main Road",
                LocationCity = "Vijayawada",
                Services = "Cardio,Diagnosis",
                Specialist = "Dr. Kishor",
                ImageName="image.jpeg",
                Type = "Medical"
            };
            var context = new ServicedbContext(_options);

            var repository = new ServiceRepository(context);

            repository.AddCompanyAsync(details);
        }

        [Fact]
        public async Task Add_Company_Details()
        {
            var details = new ServiceDetails
            {
                id = 1,
                CompanyEmail = "info1@Company.com",
                CompanyName = "Surat clinic",
                CompanyPhone = "9876549875",
                Location = "Main Road",
                LocationCity = "Vijayawada",
                Services = "Cardio,Diagnosis",
                Specialist = "Dr. Kishor",
                ImageName = "image.jpeg",
                Type="medical"
            };
            var context = new ServicedbContext(_options);

            var repository = new ServiceRepository(context);

            await repository.AddCompanyAsync(details);

            ServiceDetails compDetails =await  context.serviceDetails.FindAsync(1);

            Assert.NotNull(compDetails);
            Assert.Equal(compDetails.CompanyName, details.CompanyName);
        }

        [Fact]
        public async Task Delete_Company_with_correct_Id()
        {
            var context = new ServicedbContext(_options);

            var repository = new ServiceRepository(context);

            await repository.DeleteServiceAsync(3);

            var details = await context.serviceDetails.FindAsync(3);

            Assert.Null(details);
        }

        [Fact]
        public async Task Delete_Company_with_Wrong_Id()
        {
            var context = new ServicedbContext(_options);

            var repository = new ServiceRepository(context);

            await Assert.ThrowsAsync<CompanyNotFoundException>(async ()=>await  repository.DeleteServiceAsync(50));
        }

        [Fact]
        public async Task Get_All_Details()
        {
            var context = new ServicedbContext(_options);

            var repository = new ServiceRepository(context);

            var details = await repository.GetAllAsync();   

            Assert.IsType<List<ServiceDetails>>(details);       
        }

        [Fact]
        public async Task Get_By_Correct_Mail()
        {
            var context = new ServicedbContext(_options);

            var repository = new ServiceRepository(context);

            var details = await repository.GetByMail("info@Company.com");

            Assert.NotNull(details);
            Assert.IsType<ServiceDetails>(details);
        }

        [Fact]
        public async Task Get_By_Wrong_Mail()
        {
            var context = new ServicedbContext(_options);

            var repository = new ServiceRepository(context);

            var details = await repository.GetByMail("user@Company.com");

            Assert.Null(details);
            
        }

        [Fact]
        public async Task Update_details() {
            var details = new ServiceDetails
            {
                id = 3,
                CompanyEmail = "info@Company.com",
                CompanyName = "Surat Hospital",
                CompanyPhone = "9876549875",
                Location = "Main Road",
                LocationCity = "Vijayawada",
                Services = "Cardio,Diagnosis",
                Specialist = "Dr. Kishor",
                ImageName = "image.jpeg",
                Type="Medical"
            };
            var context = new ServicedbContext(_options);

            var repository = new ServiceRepository(context);

            //var currentDetails = await context.serviceDetails.FindAsync(3);
            await repository.UpdateServiceAsync(details);
            var updatedDetails = await context.serviceDetails.FindAsync(3);

            Assert.Equal(details.CompanyName, updatedDetails.CompanyName);

        }

        [Fact]
        public async Task get_company_by_correct_id()
        {
            var context = new ServicedbContext(_options);

            var repository = new ServiceRepository(context);

            var details = await repository.GetById(3);
            Assert.NotNull(details);
        }

        [Fact]
        public async Task get_company_by_Wrong_id()
        {
            var context = new ServicedbContext(_options);

            var repository = new ServiceRepository(context);

            
            await Assert.ThrowsAsync<CompanyNotFoundException>(async () => await repository.GetById(50));
        }
    }
}
