namespace Master_Fraud.Domain.Features.Authentication.Entities;

public class UserAccountLock
{
    public Guid Id { get; init; }
    public User User { get; set; }
    public DateTime Until { get; set; }
}