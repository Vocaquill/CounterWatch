using BLL.Constants;
using BLL.Interfaces;
using BLL.Models.Genre;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CounterWatchApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GenresController(IGenresService genresService) : ControllerBase
    {
        [HttpGet("Search")]
        [AllowAnonymous]
        public async Task<IActionResult> SearchGenres([FromQuery] GenreSearchModel model)
        {
            var result = await genresService.SearchGenreAsync(model);
            return Ok(result);
        }

        [HttpGet("BySlug")]
        [AllowAnonymous]
        public async Task<IActionResult> GetGenreBySlug([FromQuery] GenreGetBySlugModel model)
        {
            var result = await genresService.GetGenreBySlugAsync(model);
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = Roles.Admin)]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> CreateGenre([FromForm] GenreCreateModel model)
        {
            var result = await genresService.CreateGenreAsync(model);
            return Ok(result);
        }

        [HttpPut]
        [Authorize(Roles = Roles.Admin)]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> EditGenre([FromForm] GenreEditModel model)
        {
            var result = await genresService.EditGenreAsync(model);
            return Ok(result);
        }

        [HttpDelete]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> DeleteGenre([FromBody] GenreDeleteModel model)
        {
            await genresService.DeleteGenreAsync(model);
            return Ok();
        }
    }
}
