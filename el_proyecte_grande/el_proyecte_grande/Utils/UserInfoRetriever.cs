using System.Security.Claims;
using el_proyecte_grande.Models;
using Microsoft.AspNetCore.Identity;

namespace el_proyecte_grande.Utils;

public static class UserInfoRetriever
{
    public static async Task<ApplicationUser> GetAppUser(ClaimsPrincipal user, UserManager<ApplicationUser> userManager)
    {
        var claim = user.Identity as ClaimsIdentity;
        var userId = claim?.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
        return await userManager.FindByIdAsync(userId);
    }
}