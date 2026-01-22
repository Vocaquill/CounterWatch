using BLL.Constants;
using BLL.Interfaces;
using BLL.Models.Movie;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CounterWatchApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoviesController(IMoviesService moviesService) : ControllerBase
    {
        [HttpGet("Search")]
        [AllowAnonymous]
        public async Task<IActionResult> SearchMovies([FromQuery] MovieSearchModel model)
        {
            var result = await moviesService.SearchMoviesAsync(model);
            return Ok(result);
        }

        [HttpGet("BySlug")]
        [AllowAnonymous]
        public async Task<IActionResult> GetMovieBySlug([FromQuery] MovieGetBySlugModel model)
        {
            var result = await moviesService.GetMovieBySlugAsync(model);
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = Roles.Admin)]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> CreateMovie([FromForm] MovieCreateModel model)
        {
            var result = await moviesService.CreateMovieAsync(model);
            return Ok(result);
        }

        [HttpPut]
        [Authorize(Roles = Roles.Admin)]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> EditMovie([FromForm] MovieEditModel model)
        {
            var result = await moviesService.EditMovieAsync(model);
            return Ok(result);
        }

        [HttpDelete]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> DeleteMovie([FromBody] MovieDeleteModel model)
        {
            await moviesService.DeleteMovieAsync(model);
            return Ok();
        }

        [HttpPost("React")]
        [Authorize]
        public async Task<IActionResult> ReactMovie([FromBody] MovieReactionModel model)
        {
            await moviesService.ReactMovieAsync(model);
            return Ok();
        }

        [HttpPost("AddComment")]
        [Authorize]
        public async Task<IActionResult> AddComment([FromBody] MovieCommentCreateModel model)
        {
            await moviesService.AddCommentAsync(model);
            return Ok();
        }
    }
}
