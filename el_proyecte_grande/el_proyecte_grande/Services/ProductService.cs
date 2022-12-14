using el_proyecte_grande.Daos;
using el_proyecte_grande.Models;

namespace el_proyecte_grande.Services;

public class ProductService
{
    private readonly IProductDao productDao;

    public ProductService(IProductDao productDao)
    {
        this.productDao = productDao;
    }

    public Product GetProductById(int productId)
    {
        return productDao.Get(productId);
    }
    public IEnumerable<Product> GetAllProducts()
    {
        return productDao.GetAll();    
    }
}