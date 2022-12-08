using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using el_proyecte_grande.Utils;
using Microsoft.AspNetCore.Mvc;

namespace el_proyecte_grande.Models;

public class Product
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public TimeUnit Unit { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
        
    public ApplicationUser? User { get; set; }
    public List<Photo>? Photos { get; set; }
}