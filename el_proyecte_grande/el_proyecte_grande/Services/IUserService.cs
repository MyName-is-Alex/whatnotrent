using el_proyecte_grande.Models;
using Microsoft.AspNetCore.Mvc;

namespace el_proyecte_grande.Services;

public interface IUserService
{
    public Task<UserManagerResponse> RegisterUserAsync(RegisterUserModel userModel);
}