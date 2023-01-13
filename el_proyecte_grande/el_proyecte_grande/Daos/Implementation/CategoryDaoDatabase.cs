using el_proyecte_grande.Data;
using el_proyecte_grande.Models;

namespace el_proyecte_grande.Daos.Implementation;

public class CategoryDaoDatabase : IDao<Category>
{
    private ApplicationDbContext _context;

    public CategoryDaoDatabase(ApplicationDbContext context)
    {
        _context = context;
    }
    
    
    public int Add(Category item)
    {
        throw new NotImplementedException();
    }

    public void Remove(int id)
    {
        throw new NotImplementedException();
    }

    public Category Get(int id)
    {
        var result1 = _context.Category;
        var result = _context.Category.Single(x => x.Id == id);
        return result;
    }
        

    public IEnumerable<Category> GetAll()
        => _context.Category;
}