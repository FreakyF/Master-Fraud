using Master_Fraud.Domain.Features.Authentication.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Master_Fraud.Domain.Features.Authentication.Services;

public interface IAuthenticationService
{
    IActionResult LoginHandler(LoginRequest loginRequest);

    IActionResult TotpHandler(TotpRequest totpRequest);

    IActionResult LogoutHandler(LogoutRequest logoutRequest);

    IActionResult RegisterHandler(RegisterRequest registerRequest);
}