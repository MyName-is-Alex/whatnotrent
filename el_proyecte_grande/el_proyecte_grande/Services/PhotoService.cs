using el_proyecte_grande.Models;

namespace el_proyecte_grande.Services;

public class PhotoService
{
    public Photo GetPhotosForProduct(int productId)
    {
        var photos = new Photo
        {
            ProductId = productId,
            URLs = new List<string>()
        };
        
        var fileStream = new DirectoryInfo($"./ClientApp/public/ProductsImages/{productId}");
        foreach (var fileInfo in fileStream.GetFiles())
        {
            photos.URLs.Add(fileInfo.Name);
        }

        return photos;
    }
}