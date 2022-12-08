using el_proyecte_grande.Data;
using el_proyecte_grande.Models;

namespace el_proyecte_grande.Daos.Implementation;

public class ProductDaoDatabase : IProductDao
{
    private ApplicationDbContext _context;
    
    public void Add(Product item)
    {
        
    }

    public void Remove(int id)
    {
        throw new NotImplementedException();
    }

    public Product Get(int id)
    {
        throw new NotImplementedException();
    }

    public IEnumerable<Product> GetAll()
    {
        throw new NotImplementedException();
    }

    public IEnumerable<Product> GetBy(ApplicationUser user)
    {
        throw new NotImplementedException();
    }
}