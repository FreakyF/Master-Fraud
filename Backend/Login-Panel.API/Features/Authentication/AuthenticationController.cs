using System.Diagnostics;
using Login_Panel.Domain.Features.Authentication.Services;
using Microsoft.AspNetCore.Mvc;

namespace Login_Panel.API.Controllers;

[ApiController]
[Route("auth")]
public class AuthenticationController : ControllerBase
{
    private readonly ILogger<AuthenticationController> _logger;
    private readonly IAuthenticationService _authenticationService;
    private readonly IDelayService _delayService;

    public AuthenticationController(ILogger<AuthenticationController> logger,
        IAuthenticationService authenticationService, IDelayService delayService)
    {
        _logger = logger;
        _authenticationService = authenticationService;
        _delayService = delayService;
    }

    [HttpPost("login", Name = "PostLogin")]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    {
        return await _delayService.FakeDelay(() => _authenticationService.LoginHandler(loginRequest));
    }

    [HttpPost("totp", Name = "PostTotp")]
    public async Task<IActionResult> Totp([FromBody] TotpRequest totpRequest)
    {
        return await _delayService.FakeDelay(() => _authenticationService.TotpHandler(totpRequest));
    }

    [HttpPost("logout", Name = "PostLogout")]
    public async Task<IActionResult> Logout([FromBody] LogoutRequest logoutRequest)
    {
        return await _delayService.FakeDelay(() => _authenticationService.LogoutHandler(logoutRequest));
    }

    [HttpPost("register", Name = "PostRegister")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest registerRequest)
    {
        return await _delayService.FakeDelay(() => _authenticationService.RegisterHandler(registerRequest));
    }
}