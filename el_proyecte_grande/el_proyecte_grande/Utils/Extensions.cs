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

    public static async Task<IEnumerable<Product>> GetProductsWithPhotos(this IEnumerable<Product> products, PhotoService photoService)
    {
        foreach (var product in products)
        {
            product.Photos = await photoService.DownloadPhotosForProductAsync(product.Id);
        }
        return products;
    }
}