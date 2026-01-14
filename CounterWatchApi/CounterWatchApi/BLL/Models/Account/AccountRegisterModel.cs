using Microsoft.AspNetCore.Http;

namespace BLL.Models.Account;

public class AccountRegisterModel
{
    public string FirstName { get; set; } = String.Empty;
    public string LastName { get; set; } = String.Empty;
    public string Email { get; set; } = String.Empty;
    public string Password { get; set; } = String.Empty;
    public IFormFile? ImageFile { get; set; } = null;
}
