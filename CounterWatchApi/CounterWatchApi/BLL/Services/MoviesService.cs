using AutoMapper;
using AutoMapper.QueryableExtensions;
using BLL.Interfaces;
using BLL.Models.Movie;
using BLL.Models.Search;
using DAL;
using DAL.Entities.Movie;
using Microsoft.EntityFrameworkCore;

namespace BLL.Services;

public class MoviesService(
    AppDbContext context,
    IMapper mapper,
    IImageService imageService,
    IVideoService videoService,
    IAuthService authService
) : IMoviesService
{
    public async Task<MovieItemModel> CreateMovieAsync(MovieCreateModel model)
    {
        var entity = mapper.Map<MovieEntity>(model);

        if (model.Image != null)
            entity.Image = await imageService.SaveImageAsync(model.Image);

        if (model.Video != null)
            entity.Video = await videoService.SaveVideoAsync(model.Video);

        context.Movies.Add(entity);
        await context.SaveChangesAsync();

        return await context.Movies
            .Where(x => x.Id == entity.Id)
            .ProjectTo<MovieItemModel>(mapper.ConfigurationProvider)
            .FirstAsync();
    }

    public async Task<MovieItemModel> EditMovieAsync(MovieEditModel model)
    {
        var entity = await context.Movies
            .FirstOrDefaultAsync(x => x.Id == model.Id && !x.IsDeleted);

        if (entity == null)
            throw new Exception("Movie not found");

        if (entity.Image != null && model.Image != null)
            await imageService.DeleteImageAsync(entity.Image);

        if (entity.Video != null && model.Video != null)
            await videoService.DeleteVideoAsync(entity.Video);

        mapper.Map(model, entity);

        if (model.Image != null)
            entity.Image = await imageService.SaveImageAsync(model.Image);

        if (model.Video != null)
            entity.Video = await videoService.SaveVideoAsync(model.Video);

        await context.SaveChangesAsync();

        return await context.Movies
            .Where(x => x.Id == entity.Id)
            .ProjectTo<MovieItemModel>(mapper.ConfigurationProvider)
            .FirstAsync();
    }

    public async Task DeleteMovieAsync(MovieDeleteModel model)
    {
        var entity = await context.Movies
            .FirstOrDefaultAsync(x => x.Id == model.Id && !x.IsDeleted);

        if (entity != null)
        {
            entity.IsDeleted = true;
            context.Movies.Update(entity);
            await context.SaveChangesAsync();
        }
    }

    public Task<MovieItemModel?> GetMovieBySlugAsync(MovieGetBySlugModel model)
    {
        return context.Movies
            .AsNoTracking()
            .Where(x => !x.IsDeleted && x.Slug == model.Slug)
            .ProjectTo<MovieItemModel>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();
    }

    public async Task<SearchResult<MovieItemModel>> SearchMoviesAsync(MovieSearchModel model)
    {
        int currentPage = model.Page < 1 ? 1 : model.Page;
        int itemsPerPage = model.ItemPerPage < 1 ? 10 : model.ItemPerPage;

        IQueryable<MovieEntity> query = context.Movies
            .AsNoTracking()
            .Where(x => !x.IsDeleted);

        if (!string.IsNullOrWhiteSpace(model.Title))
        {
            string title = model.Title.Trim();
            query = query.Where(x => x.Title.Contains(title));
        }

        if (model.GenreId.HasValue)
            query = query.Where(x => x.GenreId == model.GenreId.Value);

        if (model.ReleaseYearFrom.HasValue)
            query = query.Where(x => x.ReleaseDate.Year >= model.ReleaseYearFrom.Value);

        if (model.ReleaseYearTo.HasValue)
            query = query.Where(x => x.ReleaseDate.Year <= model.ReleaseYearTo.Value);

        if (model.ImdbRatingFrom.HasValue)
            query = query.Where(x => x.ImdbRating >= model.ImdbRatingFrom.Value);

        int totalCount = await query.CountAsync();
        int totalPages = (int)Math.Ceiling(totalCount / (double)itemsPerPage);

        var items = await query
            .OrderByDescending(x => x.ReleaseDate)
            .Skip((currentPage - 1) * itemsPerPage)
            .Take(itemsPerPage)
            .ProjectTo<MovieItemModel>(mapper.ConfigurationProvider)
            .ToListAsync();

        return new SearchResult<MovieItemModel>
        {
            Items = items,
            Pagination = new PaginationModel
            {
                TotalCount = totalCount,
                TotalPages = totalPages,
                ItemsPerPage = itemsPerPage,
                CurrentPage = currentPage
            }
        };
    }

    public async Task ReactMovieAsync(MovieReactionModel model)
    {
        var userId = await authService.GetUserId();

        var movieExists = await context.Movies
            .AnyAsync(x => x.Id == model.MovieId && !x.IsDeleted);

        if (!movieExists)
            throw new Exception("Movie not found");

        var reaction = await context.MovieReactions
            .FirstOrDefaultAsync(x =>
                x.MovieId == model.MovieId &&
                x.UserId == userId
            );

        if (reaction == null)
        {
            reaction = mapper.Map<MovieReactionEntity>(model);
            reaction.UserId = userId;

            context.MovieReactions.Add(reaction);
        }
        else
        {
            reaction.IsLike = model.IsLike;
            context.MovieReactions.Update(reaction);
        }

        await context.SaveChangesAsync();
    }

    public async Task AddCommentAsync(MovieCommentCreateModel model)
    {
        var movieExists = await context.Movies
            .AnyAsync(x => x.Id == model.MovieId && !x.IsDeleted);

        if (!movieExists)
            throw new Exception("Movie not found");

        var comment = new CommentEntity
        {
            MovieId = model.MovieId,
            UserId = await authService.GetUserId(),
            Text = model.Text,
            CreatedAt = DateTime.UtcNow
        };

        context.Comments.Add(comment);
        await context.SaveChangesAsync();
    }
}
