using el_proyecte_grande.Daos;
using el_proyecte_grande.Models;

namespace el_proyecte_grande.Services;

public class CategoryService
{
    private readonly IDao<Category> _categoryDao;

    public CategoryService(IDao<Category> categoryDao)
    {
        this._categoryDao = categoryDao;
    }
    
    public IEnumerable<Category> GetAllCategories()
    {
        return _categoryDao.GetAll();    
    }

    public Category GetCategoryById(int id)
    {
        return _categoryDao.Get(id);
    }
}