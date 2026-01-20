using AutoMapper;
using AutoMapper.QueryableExtensions;
using BLL.Interfaces;
using BLL.Models.Movie;
using BLL.Models.Search;
using DAL;
using DAL.Entities.Movie;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

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

        foreach (var genreId in model.GenreIds.Distinct())
        {
            entity.MovieGenres.Add(new MovieGenreEntity
            {
                GenreId = genreId
            });
        }

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
            .Include(x => x.MovieGenres)
            .FirstOrDefaultAsync(x => x.Id == model.Id && !x.IsDeleted);

        if (entity == null)
            throw new Exception("Movie not found");

        mapper.Map(model, entity);

        entity.MovieGenres.Clear();

        foreach (var genreId in model.GenreIds.Distinct())
        {
            entity.MovieGenres.Add(new MovieGenreEntity
            {
                GenreId = genreId
            });
        }

        if (model.Image != null)
        {
            if (entity.Image != null)
                await imageService.DeleteImageAsync(entity.Image);

            entity.Image = await imageService.SaveImageAsync(model.Image);
        }

        if (model.Video != null)
        {
            if (entity.Video != null)
                await videoService.DeleteVideoAsync(entity.Video);

            entity.Video = await videoService.SaveVideoAsync(model.Video);
        }

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
        {
            query = query.Where(x =>
                x.MovieGenres.Any(mg => mg.GenreId == model.GenreId));
        }

        if (int.TryParse(model.ReleaseYearFrom, out int fromYear))
        {
            query = query.Where(x => x.ReleaseDate.Year >= fromYear);
        }

        if (int.TryParse(model.ReleaseYearTo, out int toYear))
        {
            query = query.Where(x => x.ReleaseDate.Year <= toYear);
        }

        if (decimal.TryParse(model.ImdbRatingFrom, System.Globalization.NumberStyles.Any, System.Globalization.CultureInfo.InvariantCulture, out decimal ratingFrom))
        {
            query = query.Where(x => x.ImdbRating >= ratingFrom);
        }

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

    public async Task SeedMoviesAsync(string jsonPath)
    {
        if (!File.Exists(jsonPath))
        {
            Console.WriteLine($"[SEEDER] Movies.json not found at {jsonPath}");
            return;
        }

        if (await context.Movies.AnyAsync())
            return;

        var json = await File.ReadAllTextAsync(jsonPath);
        var movies = JsonConvert.DeserializeObject<List<MovieSeederModel>>(json);
        if (movies == null || movies.Count == 0)
            return;

        foreach (var movie in movies)
        {
            var entity = mapper.Map<MovieEntity>(movie);

            foreach (var genreId in movie.Genres.Distinct())
                entity.MovieGenres.Add(new MovieGenreEntity { GenreId = genreId });

            if (!string.IsNullOrWhiteSpace(movie.ImageFile))
            {
                var imagePath = Path.Combine("/app/media/images", movie.ImageFile);
                if (File.Exists(imagePath))
                {
                    using var stream = File.OpenRead(imagePath);
                    var formFile = new FormFile(stream, 0, stream.Length, null, movie.ImageFile)
                    {
                        Headers = new HeaderDictionary(),
                        ContentType = GetContentType(movie.ImageFile)
                    };
                    entity.Image = await imageService.SaveImageAsync(formFile);
                }
            }

            if (!string.IsNullOrWhiteSpace(movie.VideoFile))
            {
                var videoPath = Path.Combine("/app/media/videos", movie.VideoFile);
                if (File.Exists(videoPath))
                {
                    var stream = File.OpenRead(videoPath);
                    var formFile = new FormFile(stream, 0, stream.Length, null, movie.VideoFile)
                    {
                        Headers = new HeaderDictionary(),
                        ContentType = GetContentType(movie.VideoFile)
                    };
                    entity.Video = await videoService.SaveVideoAsync(formFile);
                }
            }

            context.Movies.Add(entity);
        }

        await context.SaveChangesAsync();
    }

    private string GetContentType(string fileName)
    {
        var ext = Path.GetExtension(fileName).ToLowerInvariant();
        return ext switch
        {
            ".jpg" or ".jpeg" => "image/jpeg",
            ".png" => "image/png",
            ".gif" => "image/gif",
            ".mp4" => "video/mp4",
            ".mkv" => "video/x-matroska",
            _ => "application/octet-stream"
        };
    }
}
