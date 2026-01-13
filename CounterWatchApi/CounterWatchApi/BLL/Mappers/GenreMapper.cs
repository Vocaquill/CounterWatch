using AutoMapper;
using BLL.Models.Genre;
using BLL.Models.Seeder;
using DAL.Entities.Genre;

namespace BLL.Mappers;

public class GenreMapper : Profile
{
    public GenreMapper()
    {
        CreateMap<GenreEntity, GenreItemModel>();

        CreateMap<GenreCreateModel, GenreEntity>()
            .ForMember(x => x.Image, opt => opt.Ignore());

        CreateMap<GenreEditModel, GenreEntity>()
            .ForMember(x => x.Image, opt => opt.Ignore())
            .ForMember(x => x.Id, opt => opt.Ignore());

        CreateMap<GenreSeeder, GenreEntity>()
            .ForMember(x => x.Image, opt => opt.Ignore())
            .ForMember(x => x.Id, opt => opt.Ignore())
            .ForMember(x => x.IsDeleted, opt => opt.MapFrom(_ => false));
    }
}
