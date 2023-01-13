using el_proyecte_grande.Daos;
using el_proyecte_grande.Models;
using el_proyecte_grande.Utils;

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

    public int AddProduct(UploadProductForm input, Category category)
    {
        Product product = new Product
        {
            Name = input.Name,
            Description = input.Description,
            Price = input.Price,
            Unit = (TimeUnit)input.Unit,
            StartDate = input.StartDate,
            EndDate = input.EndDate,
            Category = category,
            Location = input.Location
        };

        return productDao.Add(product);
    }
}