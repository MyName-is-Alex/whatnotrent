using el_proyecte_grande.Daos;
using el_proyecte_grande.Models;
using el_proyecte_grande.Utils;

namespace el_proyecte_grande.Services;

public class ProductService
{
    private const int AllCategoryId = 1003;
    private readonly IProductDao productDao;
    private readonly PhotoService _photoService;

    public ProductService(IProductDao productDao)
    {
        _photoService = new PhotoService();
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

    public IEnumerable<Product> GetPageProducts(int pageNumber, int categoryId, SortByEnum sortBy, SortDirectionEnum sortDirection)
    {
        IEnumerable<Product> products = categoryId != AllCategoryId ? productDao.GetByPageAndCategory(pageNumber, categoryId, sortBy, sortDirection) 
            : productDao.GetByPage(pageNumber);

        products.AddPhotos(_photoService);
        return products;
    }

    public IEnumerable<Product> SearchProducts(int pageNumber, int categoryId, SortByEnum sortBy,
        SortDirectionEnum sortDirection, string searchStr)
    {
        IEnumerable<Product> products = categoryId != AllCategoryId
            ? productDao.SearchByPageAndCategory(pageNumber, categoryId, sortBy, sortDirection, searchStr)
            : productDao.SearchByPage(pageNumber, searchStr);
        
        products.AddPhotos(_photoService);
        return products;
    }

    public int AddProduct(UploadProductForm input, Category category, ApplicationUser user)
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
            Location = input.Location,
            User = user
        };

        return productDao.Add(product);
    }
}