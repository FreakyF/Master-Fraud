namespace Login_Panel.API;

public class TotpRequest
{
    public Guid TotpToken { get; set; }
    public string Secret { get; set; }
}