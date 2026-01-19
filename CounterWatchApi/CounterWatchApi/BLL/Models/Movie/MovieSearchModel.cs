using BLL.Models.Search;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.Models.Movie;

public class MovieSearchModel : BaseSearchParamsModel
{
    public string? Title { get; set; }
    public long? GenreId { get; set; }
    public string? ReleaseYearFrom { get; set; }
    public string? ReleaseYearTo { get; set; }
    public string? ImdbRatingFrom { get; set; }
}
