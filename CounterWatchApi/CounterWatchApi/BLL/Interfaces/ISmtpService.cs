using BLL.SMTP;

namespace BLL.Interfaces;

public interface ISmtpService
{
    Task<bool> SendEmailAsync(EmailMessage message);
}
