using el_proyecte_grande.Data;
using el_proyecte_grande.Models;
using el_proyecte_grande.Utils;

namespace el_proyecte_grande.Daos.Implementation;

public class ProductDaoDatabase : IProductDao
{
    private ApplicationDbContext _context;

    public ProductDaoDatabase(ApplicationDbContext context)
    {
        _context = context;
    }
    
    public int Add(Product item)
    {
        _context.Product.Add(item);
        _context.SaveChanges();
        var result = _context.Product.Single(x => x.Equals(item)).Id;
        return result;
    }

    public void Remove(int id)
    {
        throw new NotImplementedException();
    }

    public Product Get(int id)
        => _context.GetCompleteProducts().Single(x => x.Id == id);

    public IEnumerable<Product> GetAll() 
        => _context.GetCompleteProducts().AsQueryable();

    public IEnumerable<Product> GetBy(ApplicationUser user)
        => _context.GetCompleteProducts().Where(x => x.User == user);
}