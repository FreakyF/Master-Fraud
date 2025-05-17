namespace Master_Fraud.Domain.Features.Authentication.DTOs;

public class TotpRequest
{
    public required Guid TotpToken { get; set; }
    public required string Secret { get; set; }
}