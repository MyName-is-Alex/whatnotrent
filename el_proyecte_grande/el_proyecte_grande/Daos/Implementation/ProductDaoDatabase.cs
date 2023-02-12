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

    public IEnumerable<Product> GetByPage(int pageNumber)
    {
        return _context.GetCompleteProducts().Skip(pageNumber * 10).Take(10);
    }

    public IEnumerable<Product> GetByPageAndCategory(int pageNumber, int categoryId, SortByEnum sortBy,
        SortDirectionEnum sortDirection)
    {
        switch (sortBy)
        {
            case SortByEnum.Nothing:
                return _context.GetCompleteProducts().Where(x => x.Category.Id == categoryId).Skip(pageNumber * 10).Take(10);
            case SortByEnum.Name:
                if (sortDirection == SortDirectionEnum.Descending)
                {
                    return _context.GetCompleteProducts().Where(x => x.Category.Id == categoryId)
                        .OrderByDescending(x => x.Name).Skip(pageNumber * 10).Take(10);
                }
                return _context.GetCompleteProducts().Where(x => x.Category.Id == categoryId)
                    .OrderBy(x => x.Name).Skip(pageNumber * 10).Take(10);
            case SortByEnum.Date:
                if (sortDirection == SortDirectionEnum.Descending)
                {
                    return _context.GetCompleteProducts().Where(x => x.Category.Id == categoryId)
                        .OrderByDescending(x => x.StartDate).Skip(pageNumber * 10).Take(10);
                }
                return _context.GetCompleteProducts().Where(x => x.Category.Id == categoryId)
                    .OrderBy(x => x.StartDate).Skip(pageNumber * 10).Take(10);
            case SortByEnum.Price:
                if (sortDirection == SortDirectionEnum.Descending)
                {
                    return _context.GetCompleteProducts().Where(x => x.Category.Id == categoryId).AsEnumerable()
                        .OrderByDescending(x =>
                            {
                                return x.Price / RentingHours(x.Unit);
                            }
                            ).Skip(pageNumber * 10).Take(10);
                }
                return _context.GetCompleteProducts().Where(x => x.Category.Id == categoryId).AsEnumerable()
                    .OrderBy(x =>
                    {
                        return x.Price / RentingHours(x.Unit);
                        
                    }).Skip(pageNumber * 10).Take(10);
            default: 
                throw new ArgumentException();
        }
    }

    public IEnumerable<Product> SearchByPageAndCategory(int pageNumber, int categoryId, SortByEnum sortBy, SortDirectionEnum sortDirection,
        string searchStr)
    {
        switch (sortBy)
        {
            case SortByEnum.Nothing:
                return _context.GetCompleteProducts()
                    .Where(x => x.Category.Id == categoryId)
                    .Where(x => x.Name.Contains(searchStr))
                    .Skip(pageNumber * 10)
                    .Take(10);
            case SortByEnum.Name:
                if (sortDirection == SortDirectionEnum.Descending)
                {
                    return _context.GetCompleteProducts()
                        .Where(x => x.Category.Id == categoryId)
                        .Where(x => x.Name.Contains(searchStr))
                        .OrderByDescending(x => x.Name)
                        .Skip(pageNumber * 10)
                        .Take(10);
                }
                return _context.GetCompleteProducts()
                    .Where(x => x.Category.Id == categoryId)
                    .Where(x => x.Name.Contains(searchStr))
                    .OrderBy(x => x.Name)
                    .Skip(pageNumber * 10)
                    .Take(10);
            case SortByEnum.Date:
                if (sortDirection == SortDirectionEnum.Descending)
                {
                    return _context.GetCompleteProducts()
                        .Where(x => x.Category.Id == categoryId)
                        .Where(x => x.Name.Contains(searchStr))
                        .OrderByDescending(x => x.StartDate)
                        .Skip(pageNumber * 10)
                        .Take(10);
                }
                return _context.GetCompleteProducts()
                    .Where(x => x.Category.Id == categoryId)
                    .Where(x => x.Name.Contains(searchStr))
                    .OrderBy(x => x.StartDate)
                    .Skip(pageNumber * 10)
                    .Take(10);
            case SortByEnum.Price:
                if (sortDirection == SortDirectionEnum.Descending)
                {
                    return _context.GetCompleteProducts()
                        .Where(x => x.Category.Id == categoryId)
                        .Where(x => x.Name.Contains(searchStr))
                        .AsEnumerable()
                        .OrderByDescending(x =>
                            {
                                return x.Price / RentingHours(x.Unit);
                            }
                            ).Skip(pageNumber * 10).Take(10);
                }
                return _context.GetCompleteProducts()
                    .Where(x => x.Category.Id == categoryId)
                    .Where(x => x.Name.Contains(searchStr))
                    .AsEnumerable()
                    .OrderBy(x =>
                    {
                        return x.Price / RentingHours(x.Unit);
                        
                    }).Skip(pageNumber * 10).Take(10);
            default: 
                throw new ArgumentException();
        }
    }

    public IEnumerable<Product> SearchByPage(int pageNumber, string searchStr)
    { 
        return _context.GetCompleteProducts().Where(x => x.Name.Contains(searchStr)).Skip(pageNumber * 10).Take(10);
    }

    public IEnumerable<Product> GetBy(ApplicationUser user)
        => _context.GetCompleteProducts().Where(x => x.User == user);

    private int RentingHours(TimeUnit unit)
    {
        switch (unit)
        {
            case TimeUnit.Hour:
                return 1;
            case TimeUnit.Day:
                return 24;
            case TimeUnit.Month:
                return 720;
            case TimeUnit.Year:
                return 8772;
            default: 
                throw new ArgumentException();
        }
    }
}