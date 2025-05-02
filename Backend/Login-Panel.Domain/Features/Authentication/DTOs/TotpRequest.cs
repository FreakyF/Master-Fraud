namespace Login_Panel.Domain.Features.Authentication.DTOs;

public class TotpRequest
{
    public required Guid TotpToken { get; set; }
    public required string Secret { get; set; }
}