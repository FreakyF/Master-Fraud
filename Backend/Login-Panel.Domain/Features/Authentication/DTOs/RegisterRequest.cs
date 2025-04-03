namespace Login_Panel.API;

public class RegisterRequest
{
    public string Login { get; set; }
    public string Password { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Email { get; set; }
    public string Salt { get; set; }
}