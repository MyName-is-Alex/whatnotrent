using el_proyecte_grande.Data;
using el_proyecte_grande.Models;
using el_proyecte_grande.Utils;

namespace el_proyecte_grande.Daos.Implementation;

public class ProductDaoDatabase : IProductDao
{
    private ApplicationDbContext _context;
    
    public void Add(Product item)
    {
        throw new NotImplementedException();
    }

    public void Remove(int id)
    {
        throw new NotImplementedException();
    }

    public Product Get(int id)
        => _context.GetCompleteProducts().Single(x => x.Id == id);

    public IEnumerable<Product> GetAll() 
        => _context.GetCompleteProducts();

    public IEnumerable<Product> GetBy(ApplicationUser user)
        => _context.GetCompleteProducts().Where(x => x.User == user);
}