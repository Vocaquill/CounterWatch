using BLL.Models.Search;

namespace BLL.Models.Genre;

public class GenreSearchModel : BaseSearchParamsModel
{
    public int? Id { get; set; }
    public string? Name { get; set; }
    public string? Slug { get; set; }
}
