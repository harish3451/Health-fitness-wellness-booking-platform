using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Notification_Service.Models;
using Notification_Service.Services;

namespace Notification_Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailContoller : ControllerBase
    {
        private readonly ApiMailService _mailService;
        public MailContoller(ApiMailService service)
        {
            _mailService = service;
        }

        [HttpPost]
        public async Task<string> sendMail([FromBody] MailData mailData)
        {
            return await _mailService.sendMailAsync(mailData);
        }
    }
}
