using System.Security.Claims;
using Duende.IdentityServer.Extensions;
using el_proyecte_grande.Daos;
using el_proyecte_grande.Models;
using el_proyecte_grande.Services;
using el_proyecte_grande.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace el_proyecte_grande.Controllers;

[Authorize]
[ApiController]
[Route("api/product")]
public class ProductController : ControllerBase
{
    private readonly ProductService _productService;
    private CategoryService _categoryService;
    private PhotoService _photoService;
    private UserManager<ApplicationUser> _userManager;

    public ProductController(IProductDao productDao, IDao<Category> categoryDao, UserManager<ApplicationUser> userManager)
    {
        _categoryService = new CategoryService(categoryDao);
        _productService = new ProductService(productDao);
        _photoService = new PhotoService();
        _userManager = userManager;
    }
    
    [AllowAnonymous]
    [HttpGet("infinite/{pageNumber}/{categoryId}/{sortBy}/{sortDirection}")]
    public IActionResult GetAll(int pageNumber, int categoryId, SortByEnum sortBy, SortDirectionEnum sortDirection)
    {
        var products = _productService.GetPageProducts(pageNumber, categoryId, sortBy, sortDirection);
        return Ok(products);
    }
    
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
    
    [HttpPost("add-product")]
    public async Task<IActionResult> AddProduct([FromForm] UploadProductForm file)
    {
        var user = await UserInfoRetriever.GetAppUser(User, _userManager);

        var category = _categoryService.GetCategoryById(file.CategoryId);
        var productId = _productService.AddProduct(file, category, user);
        _photoService.UploadPhotosForProduct(file.Images, productId);
        
        return StatusCode(StatusCodes.Status201Created);
    }
}