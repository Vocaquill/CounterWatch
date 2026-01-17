using BLL.Models.Movie;
using DAL;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace BLL.Validators.Movie;

public class MovieEditValidator : AbstractValidator<MovieEditModel>
{
    public MovieEditValidator(AppDbContext db)
    {
        RuleFor(x => x.Id)
            .Cascade(CascadeMode.Stop)
            .GreaterThan(0).WithMessage("Id повинен бути більше 0")
            .MustAsync(async (id, cancellation) =>
                await db.Movies.AnyAsync(
                    m => m.Id == id && !m.IsDeleted,
                    cancellation))
            .WithMessage("Фільм не знайдено");

        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Назва є обов'язковою")
            .MaximumLength(255).WithMessage("Назва повинна містити не більше 255 символів");

        RuleFor(x => x.Slug)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Слаг є обов'язковим")
            .MaximumLength(255).WithMessage("Слаг повинен містити не більше 255 символів")
            .MustAsync(async (model, slug, cancellation) =>
            {
                var normalized = slug!.Trim().ToLower().Replace(" ", "-");
                return !await db.Movies.AnyAsync(
                    m => !m.IsDeleted &&
                         m.Slug == normalized &&
                         m.Id != model.Id,
                    cancellation);
            })
            .WithMessage("Інший фільм з таким слагом вже існує");

        RuleFor(x => x.GenreId)
            .GreaterThan(0).WithMessage("Жанр є обов'язковим")
            .MustAsync(async (genreId, cancellation) =>
                await db.Genres.AnyAsync(
                    g => g.Id == genreId && !g.IsDeleted,
                    cancellation))
            .WithMessage("Обраний жанр не знайдено");

        RuleFor(x => x.ImdbRating)
            .InclusiveBetween(0, 10)
            .When(x => x.ImdbRating.HasValue)
            .WithMessage("IMDb рейтинг повинен бути в діапазоні від 0 до 10");

        RuleFor(x => x.ReleaseDate)
            .LessThanOrEqualTo(DateTime.UtcNow)
            .WithMessage("Дата релізу не може бути в майбутньому");

        RuleFor(x => x.TrailerUrl)
            .MaximumLength(255)
            .When(x => !string.IsNullOrWhiteSpace(x.TrailerUrl))
            .WithMessage("Посилання на трейлер занадто довге");
    }
}
