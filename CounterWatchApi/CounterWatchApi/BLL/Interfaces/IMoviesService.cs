using BLL.Models.Movie;
using BLL.Models.Search;

namespace BLL.Interfaces;

public interface IMoviesService
{
    Task<MovieItemModel> CreateMovieAsync(MovieCreateModel model);
    Task<MovieItemModel> EditMovieAsync(MovieEditModel model);
    Task DeleteMovieAsync(MovieDeleteModel model);
    Task<MovieItemModel?> GetMovieBySlugAsync(MovieGetBySlugModel model);

    Task<SearchResult<MovieItemModel>> SearchMoviesAsync(MovieSearchModel model);

    Task ReactMovieAsync(MovieReactionModel model, long userId);

    Task AddCommentAsync(MovieCommentCreateModel model, long userId);
}