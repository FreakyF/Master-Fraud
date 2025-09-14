namespace Master_Fraud.Domain.Features.Authentication.DTOs;

public class LogoutRequest
{
    public required Guid Token { get; set; }
}