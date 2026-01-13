using BLL.Models.Genre;
using BLL.Models.Search;

namespace BLL.Interfaces;

public interface IGenresService
{
    Task<SearchResult<GenreItemModel>> SearchGenreAsync(GenreSearchModel model);
    Task<GenreItemModel> CreateGenreAsync(GenreCreateModel model);
    Task<GenreItemModel> EditGenreAsync(GenreEditModel model);
    Task DeleteGenreAsync(GenreDeleteModel model);
}
