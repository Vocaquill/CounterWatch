using Microsoft.AspNetCore.Http;

namespace BLL.Models.Genre;

public class GenreEditModel
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public IFormFile? Image { get; set; }
}
