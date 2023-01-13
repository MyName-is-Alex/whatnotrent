using el_proyecte_grande.Models;
using Microsoft.AspNetCore.Mvc;

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

    public void UploadPhotosForProduct(List<IFormFile> images, int productId)
    {
        string directoryPath = $".\\ClientApp\\public\\ProductsImages\\{productId}";
        Directory.CreateDirectory(directoryPath);
        foreach (var image in images)
        {
            var filePath = Path.Combine($".\\ClientApp\\public\\ProductsImages\\{productId}", image.FileName);
            using (Stream stream = new FileStream(filePath, FileMode.Create))
            {
                image.CopyTo(stream);
            }
        }
    }
}