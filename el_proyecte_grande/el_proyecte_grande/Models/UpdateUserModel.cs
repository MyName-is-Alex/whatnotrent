namespace el_proyecte_grande.Models;

public class UpdateUserModel
{
    public string? UserName { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public IFormFile? Image { get; set; }
}