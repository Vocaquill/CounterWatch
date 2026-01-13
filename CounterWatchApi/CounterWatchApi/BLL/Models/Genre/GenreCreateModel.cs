using Microsoft.AspNetCore.Http;

namespace BLL.Models.Genre;

public class GenreCreateModel
{
    public string Name { get; set; } = string.Empty;
    public IFormFile? Image { get; set; }
}
