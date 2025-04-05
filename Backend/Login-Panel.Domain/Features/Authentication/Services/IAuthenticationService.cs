using Login_Panel.API;
using Microsoft.AspNetCore.Mvc;

namespace Login_Panel.Domain.Features.Authentication.Services;

public interface IAuthenticationService
{
    IActionResult LoginHandler(LoginRequest loginRequest);

    IActionResult TotpHandler(TotpRequest totpRequest);

    IActionResult LogoutHandler(LogoutRequest logoutRequest);

    IActionResult RegisterHandler(RegisterRequest registerRequest);
}