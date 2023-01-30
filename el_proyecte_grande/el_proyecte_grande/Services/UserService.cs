using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using el_proyecte_grande.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

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

    public async Task<UserManagerResponse> LoginUserAsync(LoginUserModel userModel)
    {
        var user = await _userManager.FindByEmailAsync(userModel.Email);

        if (user == null)
        {
            return new UserManagerResponse
            {
                Message = "There is no user with this email address.",
                IsSuccess = false
            };
        }

        var result = await _userManager.CheckPasswordAsync(user, userModel.Password);
        if (!result)
        {
            return new UserManagerResponse
            {
                Message = "Invalid password.",
                IsSuccess = false
            };
        }

        var claims = new[]
        {
            new Claim("Email", userModel.Email),
            new Claim(ClaimTypes.NameIdentifier, user.Id)
        };
        
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["AuthSettings:Key"]));
        var token = new JwtSecurityToken(
            issuer: _configuration["AuthSettings:Issuer"],
            audience: _configuration["AuthSettings:Audience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(120),
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256));

        string tokenAsString = new JwtSecurityTokenHandler().WriteToken(token);
        return new UserManagerResponse
        {
            Message = tokenAsString,
            IsSuccess = true,
            ExpireDate = token.ValidTo
        };
    }
}