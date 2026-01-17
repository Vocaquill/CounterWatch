using BLL.Models.Movie;
using DAL;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace BLL.Validators.Movie;

public class MovieCommentCreateValidator : AbstractValidator<MovieCommentCreateModel>
{
    private static readonly string[] ForbiddenWords =
    {
        "сука", "блять", "бля", "нахуй", "нахуя", "хуй", "пизд", "єб", "їб",
        
        "fuck", "fucking", "shit", "bitch", "asshole", "cunt",

        "suka", "blyat", "blat", "nahui", "nahuy", "huy", "pizd", "ebat"
    };

    public MovieCommentCreateValidator(AppDbContext db)
    {
        RuleFor(x => x.MovieId)
            .Cascade(CascadeMode.Stop)
            .GreaterThan(0).WithMessage("MovieId повинен бути більше 0")
            .MustAsync(async (movieId, cancellation) =>
                await db.Movies.AnyAsync(
                    m => m.Id == movieId && !m.IsDeleted,
                    cancellation))
            .WithMessage("Фільм не знайдено");

        RuleFor(x => x.Text)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Текст коментаря є обов'язковим")
            .MaximumLength(1000).WithMessage("Коментар не може перевищувати 1000 символів")
            .Must(NotContainProfanity)
            .WithMessage("Матюкатись не можна");
    }

    private static bool NotContainProfanity(string text)
    {
        if (string.IsNullOrWhiteSpace(text))
            return true;

        var normalized = text.ToLowerInvariant();

        return !ForbiddenWords.Any(word =>
            Regex.IsMatch(
                normalized,
                $@"\b{Regex.Escape(word)}\w*\b",
                RegexOptions.CultureInvariant));
    }
}
