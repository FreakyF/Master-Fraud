namespace Login_Panel.API;

public class Password
{
    public Guid Id { get; init;  }
    public string Secret { get; set; }
    public string Salt { get; set; }
}