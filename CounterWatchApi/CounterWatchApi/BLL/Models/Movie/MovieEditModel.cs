using Microsoft.AspNetCore.Http;

namespace BLL.Models.Movie;

public class MovieEditModel
{
    public long Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public long GenreId { get; set; }
    public IFormFile? Image { get; set; }
    public IFormFile? Video { get; set; }
    public string? TrailerUrl { get; set; }
    public decimal? ImdbRating { get; set; }
    public DateTime ReleaseDate { get; set; }
}