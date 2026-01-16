using BLL.Models.Search;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.Models.Movie;

public class MovieSearchModel : BaseSearchParamsModel
{
    public string? Title { get; set; }
    public long? GenreId { get; set; }
    public int? ReleaseYearFrom { get; set; }
    public int? ReleaseYearTo { get; set; }
    public decimal? ImdbRatingFrom { get; set; }
    public int? UserRatingPercentFrom { get; set; }
}
