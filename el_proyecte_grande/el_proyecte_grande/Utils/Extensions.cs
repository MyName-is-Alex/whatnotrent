using el_proyecte_grande.Data;
using el_proyecte_grande.Models;
using Microsoft.EntityFrameworkCore;

namespace el_proyecte_grande.Utils;

public static class Extensions
{
    public static IQueryable<Product> GetCompleteProducts(this ApplicationDbContext context)
    {
        return context.Product
            .Include(c => c.User)
            .Include(b => b.Photos);
    }
}