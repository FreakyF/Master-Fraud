namespace Login_Panel.Domain.Features.Authentication.DTOs;

public class TotpResponse
{
    public required Guid Token { get; set; }
}