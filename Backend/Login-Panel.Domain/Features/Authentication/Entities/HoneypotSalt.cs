namespace Login_Panel.API;

public class HoneypotSalt
{
    public Guid Id { get; init; }
    public string Login { get; set; }
    public string Salt { get; set; }
}