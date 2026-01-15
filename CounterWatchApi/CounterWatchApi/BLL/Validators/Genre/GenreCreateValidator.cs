using BLL.Models.Genre;
using DAL;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace BLL.Validators.Genre;

public class GenreCreateValidator : AbstractValidator<GenreCreateModel>
{
    public GenreCreateValidator(AppDbContext db)
    {
        RuleFor(x => x.Name)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Назва є обов'язковою")
            .MaximumLength(250).WithMessage("Назва повинна містити не більше 250 символів")
            .MustAsync(async (name, cancellation) =>
                !await db.Genres.AnyAsync(
                    g => !g.IsDeleted &&
                         g.Name.ToLower().Trim() == name!.Trim().ToLower(),
                    cancellation))
            .WithMessage("Жанр з такою назвою вже існує");

        RuleFor(x => x.Slug)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Слаг є обов'язковим")
            .MaximumLength(250).WithMessage("Слаг повинен містити не більше 250 символів")
            .MustAsync(async (slug, cancellation) =>
            {
                var normalized = slug!.Trim().ToLower().Replace(" ", "-");
                return !await db.Genres.AnyAsync(
                    g => !g.IsDeleted && g.Slug == normalized,
                    cancellation);
            })
            .WithMessage("Жанр з таким слагом вже існує");
    }
}
