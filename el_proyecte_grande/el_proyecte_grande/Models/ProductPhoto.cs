namespace el_proyecte_grande.Models;

public class ProductPhoto : IPhoto
{
    public int ProductId { get; set; }
    public List<string> URLs { get; set; }
}