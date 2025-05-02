namespace Login_Panel.Domain.Features.Authentication.Entities;

public class UserAccountLock
{
    public Guid Id { get; init; }
    public User User { get; set; }
    public DateTime Until { get; set; }
}