using el_proyecte_grande.Models;
using el_proyecte_grande.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace el_proyecte_grande.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthenticationController : ControllerBase
{
    private IUserService _userService;

    public AuthenticationController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> RegisterAsync([FromForm] RegisterUserModel userModel)
    {
        if (ModelState.IsValid)
        {
            var result = await _userService.RegisterUserAsync(userModel);
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            return BadRequest(result.Message);
        }
        return BadRequest("Some properties are not valid.");
    }

    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> LoginAsync([FromForm] LoginUserModel userModel)
    {
        if (ModelState.IsValid)
        {
            var result = await _userService.LoginUserAsync(userModel);

            if (result.IsSuccess)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        return BadRequest("Some properties are not valid.");
    }

    [Authorize]
    [HttpPost]
    [Route("update")]
    public async Task<IActionResult> UpdateAsync([FromForm] UpdateUserModel newInfoModel)
    {
        if (ModelState.IsValid)
        {
            var result = await _userService.UpdateUserAsync(newInfoModel, User);
            if (result.IsSuccess)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        return BadRequest("Some properties are not valid");
    }
}