using System.Text.Json;
using System.Text.Json.Serialization;
using el_proyecte_grande.Daos;
using el_proyecte_grande.Models;
using el_proyecte_grande.Services;
using el_proyecte_grande.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace el_proyecte_grande.Controllers;

[Authorize]
[ApiController]
[Route("api/product")]
public class ProductController : ControllerBase
{
    private readonly ProductService _productService;
    private CategoryService _categoryService;
    private PhotoService _photoService;

    public ProductController(IProductDao productDao, IDao<Category> categoryDao)
    {
        _categoryService = new CategoryService(categoryDao);
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

    [AllowAnonymous]
    [HttpGet("get-form-info")]
    public IActionResult GetFormInfo()
    {
        var categories = _categoryService.GetAllCategories();
        var timeUnits = Enum.GetValues(typeof(TimeUnit)).Cast<TimeUnit>()
            .ToDictionary(t => (int)t, t => t.ToString());
        
        return Ok(new { categories, timeUnits });
    }
    
    [AllowAnonymous]
    [HttpPost("add-product")]
    public IActionResult AddProduct([FromForm] UploadProductForm file)
    {
        var category = _categoryService.GetCategoryById(file.CategoryId);
        var productId = _productService.AddProduct(file, category);
        _photoService.UploadPhotosForProduct(file.Images, productId);
        
        return StatusCode(StatusCodes.Status201Created);
    }
}