namespace el_proyecte_grande.Models;

public class UserModel
{
    public string Email { get; set; }
    public string UserName { get; set; }
    public string UserId { get; set; }
    public string PhoneNumber { get; set; }
    public string PhotoUrl { get; set; }
    public IEnumerable<Product> Products { get; set; }
}