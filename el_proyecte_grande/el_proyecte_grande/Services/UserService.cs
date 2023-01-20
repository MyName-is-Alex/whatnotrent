using el_proyecte_grande.Models;
using Microsoft.AspNetCore.Identity;

namespace el_proyecte_grande.Services;

public class UserService : IUserService
{
    private UserManager<ApplicationUser> _userManager;
    private IConfiguration _configuration;

    public UserService(UserManager<ApplicationUser> userManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _configuration = configuration;
    }
    
    public async Task<UserManagerResponse> RegisterUserAsync(RegisterUserModel userModel)
    {
        if (userModel == null)
            throw new NullReferenceException();

        if (userModel.Password != userModel.ConfirmPassword)
        {
            return new UserManagerResponse
            {
                Message = "Password didn't match",
                IsSuccess = false
            };
        }

        var identityUser = new ApplicationUser
        {
            Email = userModel.Email,
            UserName = userModel.Email
        };
        var result = await _userManager.CreateAsync(identityUser, userModel.Password);

        if (result.Succeeded)
        {
            return new UserManagerResponse
            {
                Message = "User created successfully.",
                IsSuccess = true
            };
        }

        return new UserManagerResponse
        {
            Message = "User did not create.",
            IsSuccess = false,
            Errors = result.Errors.Select(x => x.Description)
        };
    }
}