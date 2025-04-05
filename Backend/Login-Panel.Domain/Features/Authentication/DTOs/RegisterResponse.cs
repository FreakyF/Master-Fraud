namespace Login_Panel.API;

public class RegisterResponse
{
    public string Secret { get; init; }
    public Guid TotpToken { get; set; }
}