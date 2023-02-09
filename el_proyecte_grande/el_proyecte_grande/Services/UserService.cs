using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using el_proyecte_grande.Daos;
using el_proyecte_grande.Models;
using el_proyecte_grande.Utils;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace el_proyecte_grande.Services;

public class UserService : IUserService
{
    private UserManager<ApplicationUser> _userManager;
    private IConfiguration _configuration;
    private PhotoService _photoService;
    private IProductDao _productDao;

    public UserService(UserManager<ApplicationUser> userManager, IConfiguration configuration, IProductDao productDao)
    {
        _userManager = userManager;
        _configuration = configuration;
        _photoService = new PhotoService();
        _productDao = productDao;
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

        if (_userManager.Users.Select(x => x.PhoneNumber).Contains(userModel.PhoneNumber))
        {
            return new UserManagerResponse
            {
                Message = "This phone number is already in use.",
                IsSuccess = false
            };
        }
        
        var identityUser = new ApplicationUser
        {
            Email = userModel.Email,
            UserName = userModel.UserName,
            PhoneNumber = userModel.PhoneNumber
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
    
    public async Task<UserManagerResponse> UpdateUserAsync(UpdateUserModel newUserInfo, ClaimsPrincipal user)
    {
        var appUser = await UserInfoRetriever.GetAppUser(user, _userManager);
        
        if (newUserInfo.Image != null)
        {
            _photoService.UploadPhotoForUser(newUserInfo.Image, appUser.Id);
        }
        if (newUserInfo.Email != null)
            appUser.Email = newUserInfo.Email;
        if (newUserInfo.UserName != null)
            appUser.UserName = newUserInfo.UserName;
        if (newUserInfo.PhoneNumber != null)
            appUser.PhoneNumber = newUserInfo.PhoneNumber;

        var result = await _userManager.UpdateAsync(appUser);
        
        if (result.Succeeded)
        {
            return new UserManagerResponse
            {
                Message = "User Updated Successfully." + newUserInfo.UserName,
                IsSuccess = true
            };
        }

        return new UserManagerResponse
        {
            Message = "User did not update.",
            IsSuccess = false,
            Errors = result.Errors.Select(x => x.Description)
        };
    }

    public async Task<UserModel> GetUserInfoAsync(ClaimsPrincipal user)
    {
        var appUser = await UserInfoRetriever.GetAppUser(user, _userManager);
        var products = _productDao.GetBy(appUser);
        products.AddPhotos(_photoService);
        var result = new UserModel
        {
            Email = appUser.Email,
            UserName = appUser.UserName,
            UserId = appUser.Id,
            PhoneNumber = appUser.PhoneNumber,
            PhotoUrl = _photoService.GetPhotoForUser(appUser.Id),
            Products = products
        };

        return result;
    }
}