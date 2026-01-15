using AutoMapper;
using BLL.Models.Movie;
using DAL.Entities.Movie;

namespace BLL.Mappers;

public class MovieMapper : Profile
{
    public MovieMapper()
    {
        CreateMap<MovieEntity, MovieItemModel>()
            .ForMember(x => x.GenreName, opt => opt.MapFrom(x => x.Genre.Name))
            .ForMember(x => x.Comments, opt => opt.MapFrom(x => x.Comments));

        CreateMap<MovieCreateModel, MovieEntity>()
            .ForMember(x => x.Image, opt => opt.Ignore())
            .ForMember(x => x.Video, opt => opt.Ignore())
            .ForMember(x => x.Slug, opt => opt.Ignore())
            .ForMember(x => x.Id, opt => opt.Ignore());

        CreateMap<MovieEditModel, MovieEntity>()
            .ForMember(x => x.Image, opt => opt.Ignore())
            .ForMember(x => x.Video, opt => opt.Ignore())
            .ForMember(x => x.Slug, opt => opt.Ignore())
            .ForMember(x => x.Id, opt => opt.Ignore());

        CreateMap<CommentEntity, MovieCommentItemModel>()
            .ForMember(x => x.UserName, opt => opt.MapFrom(x => x.User.UserName));
    }
}