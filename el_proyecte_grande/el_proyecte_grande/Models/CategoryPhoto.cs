namespace el_proyecte_grande.Models;

public class CategoryPhoto : IPhoto
{
    public int CategoryId { get; set; }
    public List<string> URLs { get; set; }
}