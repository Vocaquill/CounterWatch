using AutoMapper;
using BLL.Models.Genre;
using DAL.Entities.Genre;

namespace BLL.Mappers;

public class GenreMapper : Profile
{
    public GenreMapper()
    {
        CreateMap<GenreEntity, GenreItemModel>();
    }
}
