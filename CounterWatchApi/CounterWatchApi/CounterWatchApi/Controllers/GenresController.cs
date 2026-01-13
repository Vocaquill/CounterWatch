using BLL.Interfaces;
using BLL.Models.Genre;
using Microsoft.AspNetCore.Mvc;

namespace CounterWatchApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GenresController(IGenresService genresService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> SearchGenres([FromQuery] GenreSearchModel model)
        {
            var result = await genresService.SearchGenreAsync(model);
            return Ok(result);
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> CreateGenre([FromForm] GenreCreateModel model)
        {
            var result = await genresService.CreateGenreAsync(model);
            return Ok(result);
        }
    }
}
