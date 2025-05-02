namespace Login_Panel.Domain.Features.Authentication.Entities;

public class UserAccountHoneypotLock
{
    public Guid Id { get; init; }
    public string User { get; set; }
    public DateTime Until { get; set; }
}