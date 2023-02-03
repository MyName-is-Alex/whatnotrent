using el_proyecte_grande.Models;

namespace el_proyecte_grande.Daos;

public interface IProductDao : IDao<Product>
{
    IEnumerable<Product> GetBy(ApplicationUser user);
    IEnumerable<Product> GetByPage(int pageNumber);
    public IEnumerable<Product> GetByPageAndCategory(int pageNumber, int categoryId);
}