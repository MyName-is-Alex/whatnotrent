using el_proyecte_grande.Daos;
using el_proyecte_grande.Services;
using el_proyecte_grande.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace el_proyecte_grande.Controllers;

[Authorize]
[ApiController]
[Route("api/product")]
public class ProductController : ControllerBase
{
    private readonly ProductService _productService;
    private PhotoService _photoService;

    public ProductController(IProductDao productDao)
    {
        _productService = new ProductService(productDao);
        _photoService = new PhotoService();
    }

    [AllowAnonymous]
    [HttpGet]
    public IActionResult GetAll()
    {
        var products = _productService.GetAllProducts();
        products.AddPhotos(_photoService);
        
        return Ok(products);
    }

    [AllowAnonymous]
    [HttpGet("{productId}")]
    public IActionResult Get(int productId)
    {
        var product = _productService.GetProductById(productId);
        product.Photos = _photoService.GetPhotosForProduct(productId);
        return Ok(product);
    }
}