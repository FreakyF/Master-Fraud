namespace Master_Fraud.Domain.Features.Authentication.DTOs;

public class LoginResponse
{
    public required Guid TotpToken { get; set; }
}