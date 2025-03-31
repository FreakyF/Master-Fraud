namespace Login_Panel.API;

public class TotpToken
{
    public Guid Id { get; init; }
    public User? User { get; set; }
}