namespace Master_Fraud.Domain.Features.Authentication.DTOs;

public class TotpResponse
{
    public required Guid Token { get; set; }
}