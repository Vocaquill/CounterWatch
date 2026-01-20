using AutoMapper;
using BLL.Models.Movie;
using DAL.Entities.Movie;
using System.Globalization;

namespace BLL.Mappers;

public class MovieMapper : Profile
{
    public MovieMapper()
    {
        CreateMap<MovieEntity, MovieItemModel>()
            .ForMember(x => x.Genres,
                opt => opt.MapFrom(x =>
                    x.MovieGenres.Select(mg => mg.Genre)))
            .ForMember(x => x.LikesCount,
                opt => opt.MapFrom(x => x.Reactions.Count(r => r.IsLike)))
            .ForMember(x => x.DislikesCount,
                opt => opt.MapFrom(x => x.Reactions.Count(r => !r.IsLike)))
            .ForMember(x => x.Comments,
                opt => opt.MapFrom(x => x.Comments));

        CreateMap<MovieCreateModel, MovieEntity>()
            .ForMember(x => x.ReleaseDate,
                opt => opt.MapFrom(x =>
                    DateTime.SpecifyKind(
                        DateTime.ParseExact(x.ReleaseDate, "yyyy-MM-dd", CultureInfo.InvariantCulture),
                        DateTimeKind.Utc)))
            .ForMember(x => x.ImdbRating,
                opt => opt.MapFrom(x =>
                    string.IsNullOrWhiteSpace(x.ImdbRating)
                        ? (decimal?)null
                        : decimal.Parse(x.ImdbRating!, CultureInfo.InvariantCulture)))
            .ForMember(x => x.MovieGenres, opt => opt.Ignore())
            .ForMember(x => x.Image, opt => opt.Ignore())
            .ForMember(x => x.Video, opt => opt.Ignore())
            .ForMember(x => x.Id, opt => opt.Ignore());

        CreateMap<MovieEditModel, MovieEntity>()
            .ForMember(x => x.ReleaseDate,
                opt => opt.MapFrom(x =>
                    DateTime.ParseExact(
                        x.ReleaseDate,
                        "yyyy-MM-dd",
                        CultureInfo.InvariantCulture)))
            .ForMember(x => x.ImdbRating,
                opt => opt.MapFrom(x =>
                    string.IsNullOrWhiteSpace(x.ImdbRating)
                        ? (decimal?)null
                        : decimal.Parse(x.ImdbRating!, CultureInfo.InvariantCulture)))
            .ForMember(x => x.MovieGenres, opt => opt.Ignore())
            .ForMember(x => x.Image, opt => opt.Ignore())
            .ForMember(x => x.Video, opt => opt.Ignore())
            .ForMember(x => x.Id, opt => opt.Ignore());

        CreateMap<CommentEntity, MovieCommentItemModel>()
            .ForMember(x => x.UserName,
                opt => opt.MapFrom(x => x.User.UserName));

        CreateMap<MovieReactionModel, MovieReactionEntity>()
            .ForMember(x => x.Id, opt => opt.Ignore())
            .ForMember(x => x.UserId, opt => opt.Ignore());

        CreateMap<MovieSeederModel, MovieEntity>()
            .ForMember(dest => dest.MovieGenres, opt => opt.Ignore())
            .ForMember(dest => dest.Image, opt => opt.Ignore())
            .ForMember(dest => dest.Video, opt => opt.Ignore())
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.ReleaseDate, opt => opt.MapFrom(src =>
                string.IsNullOrWhiteSpace(src.ReleaseDate)
                    ? (DateTime?)null
                    : DateTime.SpecifyKind(
                        DateTime.ParseExact(src.ReleaseDate, "yyyy-MM-dd", CultureInfo.InvariantCulture),
                        DateTimeKind.Utc)))
            .ForMember(dest => dest.ImdbRating, opt => opt.MapFrom(src =>
                string.IsNullOrWhiteSpace(src.ImdbRating)
                    ? (decimal?)null
                    : decimal.Parse(src.ImdbRating, CultureInfo.InvariantCulture)));

    }
}