using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace el_proyecte_grande.Models;

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    [JsonIgnore]
    public List<Product> Products { get; set; }
    [NotMapped]
    public Photo? Photos { get; set; }
}