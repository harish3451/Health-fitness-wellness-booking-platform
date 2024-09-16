using Microsoft.AspNetCore.Mvc;
using Moq;
using ServiceCatelogue__Service.Controllers;
using ServiceCatelogue__Service.Exception;
using ServiceCatelogue__Service.Models;
using ServiceCatelogue__Service.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit.Sdk;

namespace BackEnd_API_test.ServiceCatalogue_Test
{
    public class ControllerTest
    {
        private readonly Mock<IService> _service;
        private readonly CatalogueController _controller;
        public ControllerTest()
        {
            _service = new Mock<IService>();
            _controller = new CatalogueController(_service.Object);

            var details = new ServiceDetails()
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
            _service.Setup(r => r.AddCompanyAsync(details));
            _service.Setup(r => r.GetById(1)).ReturnsAsync(details);
            _service.Setup(r => r.GetByMail(details.CompanyEmail)).ReturnsAsync(details);   
            _controller.AddDetails(details);
        }

        [Fact]
        public async Task Get_all_Details_api()
        {
            var details = new List<ServiceDetails>()
            {
                new ServiceDetails()
            {
                id = 1,
                CompanyEmail = "info1@Company.com",
                CompanyName = "Surat clinic",
                CompanyPhone = "9876549875",
                Location = "Main Road",
                LocationCity = "Vijayawada",
                Services = "Cardio,Diagnosis",
                Specialist = "Dr. Kishor"
            },
                new ServiceDetails()
            {
                id = 2,
                CompanyEmail = "comp2@Company.com",
                CompanyName = "Surat clinic",
                CompanyPhone = "9876549875",
                Location = "Main Road",
                LocationCity = "Vijayawada",
                Services = "Cardio,Diagnosis",
                Specialist = "Dr. Kishor"
            }
            };

            _service.Setup(r=>r.GetAllAsync()).ReturnsAsync(details);

            var result = await _controller.Get();

            Assert.IsType<OkObjectResult>(result.Result);
        }


        [Fact]
        public async Task Get_details_by_Correct_id()
        {
            var details = new ServiceDetails()
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
            _service.Setup(r => r.GetById(1)).ReturnsAsync(details);

            var result = await _controller.getById(1);

            Assert.IsType<OkObjectResult>(result.Result);
        }

        [Fact]
        public async Task Get_details_by_Wrong_id()
        {
            int id = 2;
            _service.Setup(r => r.GetById(id)).ThrowsAsync(new CompanyNotFoundException(id));
            
            var result = await _controller.getById(2);

            Assert.IsType<BadRequestObjectResult>(result.Result);
           
        }

        [Fact]
        public async Task Update_Details()
        {
            int id = 1;
            var current = await _controller.getById(1);
            var details = new ServiceDetails
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
            _service.Setup(r => r.UpdateServiceAsync(details));
            var updatedDetails = await _controller.Update(1,details);
            
            Assert.NotEqual(current,updatedDetails);
        }
        [Fact]
        public async Task Update_Details_Id_mismatch()
        {
            int id = 3;
            var current = await _controller.getById(1);
            var details = new ServiceDetails
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
            _service.Setup(r => r.UpdateServiceAsync(details));
            var updatedDetails = await _controller.Update(id, details);

            Assert.IsType<BadRequestObjectResult>(updatedDetails);
        }

        [Fact]
        public async Task Add_New_Details()
        {
            var details = new ServiceDetails
            {
                id = 2,
                CompanyEmail = "comp1@Company.com",
                CompanyName = "Fit Here",
                CompanyPhone = "9876549875",
                Location = "Main Road",
                LocationCity = "Vijayawada",
                Services = "Cardio,Diagnosis",
                Specialist = "Dr. Kishor"
            };
            _service.Setup(r => r.AddCompanyAsync(details));

            var result = _controller.AddDetails(details);

            Assert.IsType<OkResult>(result.Result);
        }

        [Fact]
        public async Task Add_New_Details_With_registered_mail()
        {
            var details = new ServiceDetails
            {
                id = 2,
                CompanyEmail = "info1@Company.com",
                CompanyName = "Fit Here",
                CompanyPhone = "9876549875",
                Location = "Main Road",
                LocationCity = "Vijayawada",
                Services = "Cardio,Diagnosis",
                Specialist = "Dr. Kishor"
            };
            _service.Setup(r => r.AddCompanyAsync(details));

            var result = _controller.AddDetails(details);

            Assert.IsType<BadRequestObjectResult>(result.Result);
        }

        [Fact]
        public async Task Detele_with_correct_id()
        {
            int id = 1;
            _service.Setup(r=>r.DeleteServiceAsync(id));
            var result = await _controller.delete(id);

            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task Detele_with_Not_available_id()
        {
            int id = 2;
            _service.Setup(r => r.DeleteServiceAsync(id)).ThrowsAsync(new CompanyNotFoundException(id));
            var result = await _controller.delete(id);

            Assert.IsType<BadRequestObjectResult>(result);
        }
    }
}
