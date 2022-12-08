using el_proyecte_grande.Daos;
using el_proyecte_grande.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace el_proyecte_grande.Controllers;

[Authorize]
[ApiController, Route("/api/product")]
public class ProductController : ControllerBase
{
    public ProductService ProductService { get; }
    
    public ProductController(IProductDao productDao)
    {
        ProductService = new ProductService(productDao);
    }
    
    [AllowAnonymous]
    [HttpGet("/products")]
    public IActionResult GetProducts()
    {
        var products = ProductService.GetAllProducts();
        return Ok(products);
    }
}