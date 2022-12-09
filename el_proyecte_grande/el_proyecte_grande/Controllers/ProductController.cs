using el_proyecte_grande.Daos;
using el_proyecte_grande.Models;
using el_proyecte_grande.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace el_proyecte_grande.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class ProductController : ControllerBase
{
    private ProductService _productService;
        
    public ProductController(IProductDao productDao)
    {
        _productService = new ProductService(productDao);
    }

    [AllowAnonymous]
    [HttpGet]
    public IActionResult Get()
    {
        var products = _productService.GetAllProducts();
        return Ok(products);
    }
}