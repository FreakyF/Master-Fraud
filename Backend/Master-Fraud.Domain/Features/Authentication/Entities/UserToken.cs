namespace Master_Fraud.Domain.Features.Authentication.Entities;

public class UserToken
{
    public Guid Id { get; init;  }
    public User User { get; set; }
}