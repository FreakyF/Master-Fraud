namespace Login_Panel.Domain.Features.Authentication.Entities;

public class UserToken
{
    public Guid Id { get; init;  }
    public User User { get; set; }
}