namespace Master_Fraud.Domain.Features.Authentication.DTOs;

public class LoginRequest
{
    public required string Login { get; set; }
    public required string Password { get; set; }
}