using BLL.Interfaces;
using BLL.Models.Movie;
using Microsoft.AspNetCore.Mvc;

namespace CounterWatchApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoviesController(IMoviesService moviesService) : ControllerBase
    {
        [HttpGet("Search")]
        public async Task<IActionResult> SearchMovies([FromQuery] MovieSearchModel model)
        {
            var result = await moviesService.SearchMoviesAsync(model);
            return Ok(result);
        }

        [HttpGet("BySlug")]
        public async Task<IActionResult> GetMovieBySlug([FromQuery] MovieGetBySlugModel model)
        {
            var result = await moviesService.GetMovieBySlugAsync(model);
            return Ok(result);
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> CreateMovie([FromForm] MovieCreateModel model)
        {
            var result = await moviesService.CreateMovieAsync(model);
            return Ok(result);
        }

        [HttpPut]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> EditMovie([FromForm] MovieEditModel model)
        {
            var result = await moviesService.EditMovieAsync(model);
            return Ok(result);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteMovie([FromBody] MovieDeleteModel model)
        {
            await moviesService.DeleteMovieAsync(model);
            return Ok();
        }

        [HttpPost("React")]
        public async Task<IActionResult> ReactMovie([FromBody] MovieReactionModel model)
        {
            await moviesService.ReactMovieAsync(model);
            return Ok();
        }

        [HttpPost("AddComment")]
        public async Task<IActionResult> AddComment([FromBody] MovieCommentCreateModel model)
        {
            await moviesService.AddCommentAsync(model);
            return Ok();
        }
    }
}
