using el_proyecte_grande.Models;
using el_proyecte_grande.Services;
using Microsoft.AspNetCore.Mvc;

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
    public async Task<IActionResult> RegisterAsync([FromBody] RegisterUserModel userModel)
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
}