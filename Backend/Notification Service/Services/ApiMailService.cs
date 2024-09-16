using Notification_Service.Models;
using Newtonsoft.Json;
using Microsoft.Extensions.Options;

namespace Notification_Service.Services
{
    public class ApiMailService : IApiMailService
    {
        private readonly MailSetting _mailsetting;
        private readonly HttpClient _httpclient;
        public ApiMailService( IOptions<MailSetting> options, IHttpClientFactory clientFactory)
        {
            _mailsetting = options.Value;
            _httpclient = clientFactory.CreateClient("MailTrapApiClient");

        }
        public async Task<string> sendMailAsync(MailData mailData)
        {
            var htmlBody = string.Format(mailData.Body);
            var apiMail = new
            {
                From = new {Email = _mailsetting.FromEmail, Name = _mailsetting.FromName},
                To = new[] { new { Email = mailData.ToEmail, Name = mailData.ToName } },
                Subject = mailData.Subject,
                Html = htmlBody,
            };
            var httpResponse = await _httpclient.PostAsJsonAsync("send", apiMail);
            var responseJson = await httpResponse.Content.ReadAsStringAsync();
            var response = JsonConvert.DeserializeObject<Dictionary<string, object>>(responseJson);
            if (response != null && response.TryGetValue("success",out object ? success) && success is bool boolSuccess && boolSuccess)
            {

                return "true";
            }
            return responseJson.ToString();
        }
    }
}
