using AutoMapper;
using BLL.Interfaces;
using BLL.Models.Genre;
using BLL.Models.Search;
using BLL.Models.Seeder;
using DAL;
using DAL.Entities.Genre;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace BLL.Services;

public class GenreService(AppDbContext context, 
    IMapper mapper,
    IImageService imageService) : IGenresService
{
    public async Task<GenreItemModel> CreateGenreAsync(GenreCreateModel model)
    {
        var entity = mapper.Map<GenreEntity>(model);

        entity.Image = model.Image != null ? await imageService.SaveImageAsync(model.Image) : null;

        context.Genres.Add(entity);
        await context.SaveChangesAsync();

        return mapper.Map<GenreItemModel>(entity);
    }

    public async Task DeleteGenreAsync(GenreDeleteModel model)
    {
        var entity = context.Genres.FirstOrDefault(x => x.Id == model.Id && !x.IsDeleted);
        if (entity != null)
        {
            entity.IsDeleted = true;
            context.Genres.Update(entity);
            await context.SaveChangesAsync();
        }
    }

    public async Task<GenreItemModel> EditGenreAsync(GenreEditModel model)
    {
        var entity = await context.Genres
            .FirstOrDefaultAsync(x => x.Id == model.Id && !x.IsDeleted);

        if (entity!.Image != null)
            await imageService.DeleteImageAsync(entity.Image);

        mapper.Map(model, entity);

        if (model.Image != null)
            entity.Image = await imageService.SaveImageAsync(model.Image);

        await context.SaveChangesAsync();

        return mapper.Map<GenreItemModel>(entity);
    }

    public Task<GenreItemModel?> GetGenreBySlugAsync(GenreGetBySlugModel model)
    {
        return context.Genres
            .AsNoTracking()
            .Where(x => !x.IsDeleted && x.Slug == model.Slug)
            .Select(x => mapper.Map<GenreItemModel>(x))
            .FirstOrDefaultAsync();
    }

    public async Task<SearchResult<GenreItemModel>> SearchGenreAsync(GenreSearchModel model)
    {
        int currentPage = model.Page < 1 ? 1 : model.Page;
        int itemsPerPage = model.ItemPerPage < 1 ? 10 : model.ItemPerPage;

        IQueryable<GenreEntity> query = context.Genres
            .AsNoTracking()
            .Where(x => !x.IsDeleted);

        if (model.Id.HasValue)
        {
            query = query.Where(x => x.Id == model.Id.Value);
        }

        if (!string.IsNullOrWhiteSpace(model.Name))
        {
            string name = model.Name.Trim();
            query = query.Where(x => x.Name.Contains(name));
        }

        if (!string.IsNullOrWhiteSpace(model.Slug))
        {
            string slug = model.Slug.Trim();
            query = query.Where(x => x.Slug.Contains(slug));
        }

        int totalCount = await query.CountAsync();

        int totalPages = (int)Math.Ceiling(totalCount / (double)itemsPerPage);

        var items = await query
            .OrderBy(x => x.Name)
            .Skip((currentPage - 1) * itemsPerPage)
            .Take(itemsPerPage)
            .Select(x => mapper.Map<GenreItemModel>(x))
            .ToListAsync();

        return new SearchResult<GenreItemModel>
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

    public async Task SeedGenresAsync(string jsonPath)
    {
        if (!File.Exists(jsonPath))
        {
            Console.WriteLine($"Genres seed file not found: {jsonPath}");
            return;
        }

        if (await context.Genres.AnyAsync())
            return;

        try
        {
            var json = await File.ReadAllTextAsync(jsonPath);

            var items = JsonConvert.DeserializeObject<List<GenreSeeder>>(json);
            if (items == null || items.Count == 0)
                return;

            var entities = mapper.Map<List<GenreEntity>>(items);

            foreach (var entity in entities)
            {
                var source = items.First(x => x.Slug == entity.Slug);

                if (!string.IsNullOrWhiteSpace(source.ImagePath))
                {
                    if (source.ImagePath.StartsWith("http", StringComparison.OrdinalIgnoreCase))
                    {
                        entity.Image = await imageService.SaveImageFromUrlAsync(source.ImagePath);
                    }
                }
            }

            await context.Genres.AddRangeAsync(entities);
            await context.SaveChangesAsync();
        }
        catch (JsonException ex)
        {
            Console.WriteLine($"JSON parse error: {ex.Message}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Seed genres error: {ex.Message}");
        }
    }
}
