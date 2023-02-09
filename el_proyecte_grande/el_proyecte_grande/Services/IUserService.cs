using System.Security.Claims;
using el_proyecte_grande.Models;
using Microsoft.AspNetCore.Identity.UI.V4.Pages.Account.Internal;
using Microsoft.AspNetCore.Mvc;

namespace el_proyecte_grande.Services;

public interface IUserService
{
    public Task<UserManagerResponse> RegisterUserAsync(RegisterUserModel userModel);
    public Task<UserManagerResponse> LoginUserAsync(LoginUserModel userModel);
    public Task<UserManagerResponse> UpdateUserAsync(UpdateUserModel newUserInfo, ClaimsPrincipal user);
    public Task<UserModel> GetUserInfoAsync(ClaimsPrincipal user);
}