using BLL.Models.Genre;
using BLL.Models.Search;

namespace BLL.Interfaces;

public interface IGenresService
{
    Task<SearchResult<GenreItemModel>> SearchGenreAsync(GenreSearchModel model);
}
