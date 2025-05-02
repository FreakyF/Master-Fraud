namespace Login_Panel.Domain.Features.Authentication.DTOs;

public class LoginResponse
{
    public required Guid TotpToken { get; set; }
}