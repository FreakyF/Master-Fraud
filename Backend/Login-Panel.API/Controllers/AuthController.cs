using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OtpNet;
using Guid = System.Guid;

namespace Login_Panel.API.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly ILogger<AuthController> _logger;

    public AuthController(ILogger<AuthController> logger)
    {
        _logger = logger;
    }

    [HttpPost("login", Name = "PostLogin")]
    public IActionResult Login([FromBody] LoginRequest loginRequest)
    {
        using var context = new AppDbContext();

        var user = context.Users.SingleOrDefault(
            u => u.Login == loginRequest.Login && u.Password.Secret == loginRequest.Password
        );

        if (user == null)
        {
            return BadRequest();
        }

        var totpToken = context.TotpTokens.Add(new TotpToken
        {
            Id = Guid.Empty,
            User = user
        });

        context.SaveChanges();

        return Ok(new LoginResponse { TotpToken = totpToken.Entity.Id });
    }

    [HttpPost("totp", Name = "PostTotp")]
    public IActionResult Totp([FromBody] TotpRequest totpRequest)
    {
        using var context = new AppDbContext();

        var totpToken = context.TotpTokens
            .Include(totpTokens => totpTokens.User)
            .ThenInclude(user => user.Totp)
            .SingleOrDefault(
                t => t.Id == totpRequest.TotpToken
            );

        if (totpToken == null)
        {
            return BadRequest();
        }

        var totp = new OtpNet.Totp(totpToken.User.Totp.Secret);

        var isValid = totp.VerifyTotp(totpRequest.Secret, out _);

        if (!isValid) return BadRequest();

        var token = context.UserTokens.Add(new UserToken
        {
            Id = Guid.Empty,
            User = totpToken.User
        });

        context.SaveChanges();

        return Ok(new TotpResponse
        {
            Token = token.Entity.Id
        });
    }

    [HttpPost("logout", Name = "PostLogout")]
    public IActionResult Logout([FromBody] LogoutRequest logoutRequest)
    {
        using var context = new AppDbContext();

        var token = context.UserTokens.SingleOrDefault(t => t.Id == logoutRequest.Token);

        if (token == null)
        {
            return BadRequest();
        }

        context.UserTokens.Remove(token);
        context.SaveChanges();

        return Ok();
    }

    [HttpPost("salt", Name = "PostSalt")]
    public IActionResult Salt([FromBody] SaltRequest saltRequest)
    {
        using var context = new AppDbContext();

        var user = context.Users.Include(user => user.Password).SingleOrDefault(
            u => u.Login == saltRequest.User
        );

        if (user != null)
            return Ok(new SlatResponse
            {
                Salt = user.Password.Salt
            });

        var randomSalt = RandomNumberGenerator.GetBytes(16);
        return Ok(new SlatResponse
        {
            Salt = Convert.ToBase64String(randomSalt)
        });
    }

    [HttpPost("register", Name = "PostRegister")]
    public IActionResult Register([FromBody] RegisterRequest registerRequest)
    {
        using var context = new AppDbContext();

        var password = context.Passwords.Add(new Password
        {
            Id = Guid.Empty,
            Salt = registerRequest.Salt,
            Secret = registerRequest.Password
        });

        var totp = context.Totps.Add(new Totp
        {
            Id = Guid.Empty,
            Secret = KeyGeneration.GenerateRandomKey(20)
        });

        var user = context.Users.Add(new User
        {
            Id = Guid.Empty,
            Email = registerRequest.Email,
            Login = registerRequest.Login,
            Name = registerRequest.Name,
            Surname = registerRequest.Surname,
            Password = password.Entity,
            Totp = totp.Entity
        });

        context.SaveChanges();

        return Ok(new RegisterResponse
        {
            Secret =
                $"otpauth://totp/Panel:{user.Entity.Login}?secret={Base32Encoding.ToString(totp.Entity.Secret)}&issuer=Panel"
        });
    }
}