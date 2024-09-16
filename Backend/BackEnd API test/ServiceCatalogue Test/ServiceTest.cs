using Moq;
using ServiceCatelogue__Service.Exception;
using ServiceCatelogue__Service.Models;
using ServiceCatelogue__Service.Repository;
using ServiceCatelogue__Service.Services;

namespace BackEnd_API_test.ServiceCatalogue_Test
{
    public class ServiceTest
    {
        private readonly IService _service;
        private readonly Mock<IServiceRepository> _RepoMock;

        public ServiceTest()
        {
            _RepoMock = new Mock<IServiceRepository>();
            _service = new Service(_RepoMock.Object);
            var details = new ServiceDetails
            {
                id = 3,
                CompanyEmail = "info@Company.com",
                CompanyName = "Surat clinic",
                CompanyPhone = "9876549875",
                Location = "Main Road",
                LocationCity = "Vijayawada",
                Services = "Cardio,Diagnosis",
                Specialist = "Dr. Kishor"
            };
            _service.AddCompanyAsync(details);  
        }

        [Fact]
        public async Task Add_Company()
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
                Specialist = "Dr. Kishor"
            };

            await _service.AddCompanyAsync(details);

            _RepoMock.Verify(r => r.AddCompanyAsync(details), Times.Once);
        }

        [Fact]
        public async Task Delete_company_With_Correct_Id()
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
                Specialist = "Dr. Kishor"
            };
            
             _RepoMock.Setup(r => r.GetById(1)).ReturnsAsync(details);
            await _service.DeleteServiceAsync(1);

            _RepoMock.Verify(r => r.DeleteServiceAsync(1), Times.Once);
        }

        [Fact]
        public async Task Delete_company_With_Wrong_Id()
        {
            //_RepoMock.Setup
            _RepoMock.Setup(r => r.GetById(1)).ReturnsAsync((ServiceDetails)null);
            Assert.ThrowsAsync<CompanyNotFoundException>(() => _service.DeleteServiceAsync(1));
        }

        [Fact]
        public async Task Get_details_by_correct_id()
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
                Specialist = "Dr. Kishor"
            };
            _RepoMock.Setup(r=>r.GetById(1)).ReturnsAsync(details);

            var comDetails = await _service.GetById(1);

            Assert.NotNull(comDetails);
        }

        [Fact]
        public async Task Get_details_by_wrong_id()
        {

            
            _RepoMock.Setup(r => r.GetById(3)).ReturnsAsync((ServiceDetails)null);

            var comDetails = await _service.GetById(3);

            Assert.Null(comDetails);
        }

        [Fact]
        public async Task Gell_all_details()
        {
            var ListDetails = new List<ServiceDetails>() {
                new ServiceDetails
                {
                id = 1,
                CompanyEmail = "info1@Company.com",
                CompanyName = "Surat clinic",
                CompanyPhone = "9876549875",
                Location = "Main Road",
                LocationCity = "Vijayawada",
                Services = "Cardio,Diagnosis",
                Specialist = "Dr. Kishor"
                }
            };
            _RepoMock.Setup(r=>r.GetAllAsync()).ReturnsAsync(ListDetails);

            var result = await _service.GetAllAsync();

            Assert.Equal(ListDetails, result);
        }

        [Fact]
        public async Task Get_By_Mail()
        {
            var email = "info1@Company.com";
            var details = new ServiceDetails
            {
                id = 1,
                CompanyEmail = "info1@Company.com",
                CompanyName = "Surat clinic",
                CompanyPhone = "9876549875",
                Location = "Main Road",
                LocationCity = "Vijayawada",
                Services = "Cardio,Diagnosis",
                Specialist = "Dr. Kishor"
            };
            _RepoMock.Setup(r => r.GetByMail(email)).ReturnsAsync(details);

            var result = await _service.GetByMail(email);

            Assert.Equal(details, result);  

        }

        [Fact]
        public async Task Update_service()
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
                Specialist = "Dr. Kishor"
            };
            _RepoMock.Setup(r=>r.GetById(1)).ReturnsAsync(details);
            var currentDetails = await _service.GetById(1);
            var Updatedetails = new ServiceDetails
            {
                id = 1,
                CompanyEmail = "info1@Company.com",
                CompanyName = "Surat Hospital",
                CompanyPhone = "9876549875",
                Location = "Main Road",
                LocationCity = "Vijayawada",
                Services = "Cardio,Diagnosis",
                Specialist = "Dr. Kishor"
            };
            _RepoMock.Setup(r => r.UpdateServiceAsync(Updatedetails));
            var UpdatedDetails = await _service.GetById(1);
            Assert.NotEqual(currentDetails, Updatedetails);
        }
    }
}
