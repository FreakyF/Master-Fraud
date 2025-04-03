namespace Login_Panel.API;

public class Totp
{
    public Guid Id { get; init; }
    public required byte[] Secret { get; init; }
}