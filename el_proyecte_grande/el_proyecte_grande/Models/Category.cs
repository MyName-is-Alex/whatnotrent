using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace el_proyecte_grande.Models;

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    
    public ICollection<Product> Products { get; set; }
    [NotMapped]
    public Photo? Photos { get; set; }
}