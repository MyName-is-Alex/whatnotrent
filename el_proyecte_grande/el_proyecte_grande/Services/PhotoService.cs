using el_proyecte_grande.Models;
using Microsoft.AspNetCore.Mvc;

namespace el_proyecte_grande.Services;

public class PhotoService
{
    public ProductPhoto GetPhotosForProduct(int productId)
    {
        var photos = new ProductPhoto
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

    public CategoryPhoto GetPhotosForCategory(int categoryId)
    {
        var photos = new CategoryPhoto
        {
            CategoryId = categoryId,
            URLs = new List<string>()
        };
        
        var fileStream = new DirectoryInfo($"./ClientApp/public/CategoriesImages/{categoryId}");
        
        foreach (var fileInfo in fileStream.GetFiles())
        {
            photos.URLs.Add(fileInfo.Name);
        }

        return photos;
    }

    public void UploadPhotoForUser(IFormFile image, string userId)
    {
        string directoryPath = $".\\ClientApp\\public\\UsersImages\\{userId}";
        string[] files = Directory.GetFiles(directoryPath);
        
        if (!Directory.Exists(directoryPath))
            Directory.CreateDirectory(directoryPath);
        else
        {
            foreach (var file in files)
            {
                File.Delete(file);
            }
        }

        var filePath = Path.Combine($".\\ClientApp\\public\\UsersImages\\{userId}", image.FileName);
        using (Stream stream = new FileStream(filePath, FileMode.Create))
        {
            image.CopyTo(stream);
        }
    }

    public string GetPhotoForUser(string userId)
    {
        var fileStream = new DirectoryInfo($"./ClientApp/public/UsersImages/{userId}");
        return fileStream.GetFiles()[0].Name;
    } 
}