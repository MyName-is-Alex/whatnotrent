using Humanizer.Localisation;

namespace el_proyecte_grande.Models;

public class UploadProductForm
{
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public int Unit { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int CategoryId { get; set; }
    public int? UserId { get; set; }
    public string Location { get; set; }

    public List<IFormFile>? Images { get; set; }
}