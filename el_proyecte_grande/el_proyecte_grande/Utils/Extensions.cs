using el_proyecte_grande.Data;
using el_proyecte_grande.Models;
using el_proyecte_grande.Services;
using Microsoft.EntityFrameworkCore;

namespace el_proyecte_grande.Utils;

public static class Extensions
{
    public static IQueryable<Product> GetCompleteProducts(this ApplicationDbContext context)
    {
        return context.Product
            .Include(c => c.User);
    }

    public static void AddPhotos(this IEnumerable<Product> products, PhotoService photoService)
    {
        foreach (var product in products)
        {
            product.Photos = photoService.GetPhotosForProduct(product.Id);
        }
    }
}