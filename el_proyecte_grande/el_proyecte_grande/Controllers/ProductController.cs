using Amazon.S3;
using Amazon.S3.Model;
using AutoMapper.Internal;
using el_proyecte_grande.Daos;
using el_proyecte_grande.Models;
using el_proyecte_grande.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using el_proyecte_grande.Utils;

namespace el_proyecte_grande.Controllers;

[Authorize]
[ApiController]
[Route("api/product")]
public class ProductController : ControllerBase
{
    private readonly ProductService _productService;
    private readonly PhotoService _photoService;
    private IAmazonS3 _s3Client;
        
    public ProductController(IProductDao productDao, IAmazonS3 s3Client)
    {
        _s3Client = s3Client;
        _productService = new ProductService(productDao);
        _photoService = new PhotoService(s3Client);
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = _productService.GetAllProducts();
        /*foreach (var product in products)
        {
            product.Photos = await _photoService.DownloadPhotosForProductAsync(product.Id);
        }*/
        var productsWithPhotos = await products.GetProductsWithPhotos(_photoService);
        return Ok(productsWithPhotos);
    }

    [AllowAnonymous]
    [HttpGet("/{productId}")]
    public IActionResult Get(int productId)
    {
        var product = _productService.GetProductById(productId);
        return Ok(product);
    }
}