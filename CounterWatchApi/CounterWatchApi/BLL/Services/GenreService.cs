using AutoMapper;
using BLL.Interfaces;
using BLL.Models.Genre;
using BLL.Models.Search;
using DAL;
using DAL.Entities.Genre;
using Microsoft.EntityFrameworkCore;

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
}
