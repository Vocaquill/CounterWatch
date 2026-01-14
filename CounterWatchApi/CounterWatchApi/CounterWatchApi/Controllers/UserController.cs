using AutoMapper;
using BLL.Constants;
using BLL.Interfaces;
using BLL.Models.Search;
using BLL.Models.User;
using BLL.Services;
using DAL.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace CounterWatchApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController(IUserService userService) : Controller
{
    [HttpGet("list")]
    public async Task<IActionResult> GetAllUsers()
    {
        var model = await userService.GetAllUsersAsync();

        return Ok(model);
    }

    [HttpPost("search")]
    public async Task<IActionResult> SearchUsers([FromBody] UserSearchModel model)
    {
        Stopwatch stopwatch = Stopwatch.StartNew();
        stopwatch.Start();

        var result = await userService.SearchUsersAsync(model);

        stopwatch.Stop();

        Console.WriteLine($"Search Users took {stopwatch.ElapsedMilliseconds} ms");

        return Ok(result);
    }

    [HttpPut("edit")]
    public async Task<IActionResult> EditUser([FromForm] UserEditModel model)
    {
        var res = await userService.EditUserAsync(model);
        return Ok(res);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(int id)
    {
        var user = await userService.GetUserById(id);
        if (user == null)
        {
            return NotFound($"User with id: {id} not found");
        }
        return Ok(user);
    }

    [HttpDelete("delete")]
    public async Task<IActionResult> DeleteUser([FromBody] UserDeleteModel model)
    {
        await userService.DeleteUser(model.Id);
        return Ok();
    }
}
