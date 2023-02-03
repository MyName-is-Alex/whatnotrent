using el_proyecte_grande.Daos;
using el_proyecte_grande.Models;
using el_proyecte_grande.Utils;

namespace el_proyecte_grande.Services;

public class CategoryService
{
    private readonly IDao<Category> _categoryDao;
    private readonly PhotoService _photoService;

    public CategoryService(IDao<Category> categoryDao)
    {
        _photoService = new PhotoService();
        this._categoryDao = categoryDao;
    }
    
    public IEnumerable<Category> GetAllCategories()
    {
        var categories = _categoryDao.GetAll();
        categories.AddPhotos(_photoService);
        return categories; 
    }

    public Category GetCategoryById(int id)
    {
        return _categoryDao.Get(id);
    }
}