using AutoMapper;
using BLL.Interfaces;
using BLL.Models.Genre;
using BLL.Models.Search;
using DAL;
using DAL.Entities.Genre;
using Microsoft.EntityFrameworkCore;

namespace BLL.Services;

public class GenreService(AppDbContext context, IMapper mapper) : IGenresService
{
    public Task<GenreItemModel> CreateGenreAsync(GenreCreateModel model)
    {
        throw new NotImplementedException();
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
