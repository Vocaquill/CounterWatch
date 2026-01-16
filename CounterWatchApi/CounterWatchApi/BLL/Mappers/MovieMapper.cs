using AutoMapper;
using BLL.Models.Movie;
using DAL.Entities.Movie;

namespace BLL.Mappers;

public class MovieMapper : Profile
{
    public MovieMapper()
    {
        CreateMap<MovieEntity, MovieItemModel>()
            .ForMember(x => x.Genre,
                opt => opt.MapFrom(x => x.Genre))
            .ForMember(x => x.LikesCount,
                opt => opt.MapFrom(x => x.Reactions.Count(r => r.IsLike)))
            .ForMember(x => x.DislikesCount,
                opt => opt.MapFrom(x => x.Reactions.Count(r => !r.IsLike)))
            .ForMember(x => x.Comments,
                opt => opt.MapFrom(x => x.Comments));

        CreateMap<MovieCreateModel, MovieEntity>()
            .ForMember(x => x.Image, opt => opt.Ignore())
            .ForMember(x => x.Video, opt => opt.Ignore())
            .ForMember(x => x.Id, opt => opt.Ignore());

        CreateMap<MovieEditModel, MovieEntity>()
            .ForMember(x => x.Image, opt => opt.Ignore())
            .ForMember(x => x.Video, opt => opt.Ignore())
            .ForMember(x => x.Id, opt => opt.Ignore());

        CreateMap<CommentEntity, MovieCommentItemModel>()
            .ForMember(x => x.UserName,
                opt => opt.MapFrom(x => x.User.UserName));

        CreateMap<MovieReactionModel, MovieReactionEntity>()
        .ForMember(x => x.Id, opt => opt.Ignore())
        .ForMember(x => x.UserId, opt => opt.Ignore());
    }
}