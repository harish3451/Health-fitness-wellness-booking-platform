using Azure.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServiceCatelogue__Service.Exception;
using ServiceCatelogue__Service.Models;
using ServiceCatelogue__Service.Services;

namespace ServiceCatelogue__Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatalogueController : ControllerBase
    {
        private readonly IService _service;
        public CatalogueController(IService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult< IEnumerable <ServiceDetails>>> Get() {
            var details = await _service.GetAllAsync();
            return  Ok(details);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceDetails>> getById(int id)
        {
            try
            {
                return Ok( await _service.GetById(id)); 
            }
            catch (CompanyNotFoundException ex)
            {

                return BadRequest(ex.Message);
            }
        }


        [HttpPost("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] ServiceDetails details) {
            if (id != details.id)
            {
                return BadRequest("Id mismatch");
            }
            await _service.UpdateServiceAsync(details);
            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> AddDetails([FromBody] ServiceDetails details) 
        {
            //return Ok(await _service.GetByMail(details.CompanyEmail));
            if(await _service.GetByMail(details.CompanyEmail) != null)
            {
                return BadRequest(new { Message = "Company Mail Id is already registered " });
            }

            await _service.AddCompanyAsync(details);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> delete(int id)
        {
            try
            {
                await _service.DeleteServiceAsync(id);
                return Ok("Service deleted");
            }catch(CompanyNotFoundException e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
