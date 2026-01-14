using Microsoft.AspNetCore.Http;

namespace BLL.Models.User;

public class UserEditModel
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public IFormFile? Image { get; set; }
    public List<string>? Roles { get; set; }
}
