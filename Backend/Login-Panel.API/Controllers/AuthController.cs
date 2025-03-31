using System.Diagnostics;
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

    const int targetMilliseconds = 100;

    public AuthController(ILogger<AuthController> logger)
    {
        _logger = logger;
    }

    [HttpPost("login", Name = "PostLogin")]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    {
        await using var context = new AppDbContext();
        var stopwatch = Stopwatch.StartNew();
        IActionResult response;

        var user = await context.Users.SingleOrDefaultAsync(
            u => u.Login == loginRequest.Login && u.Password.Secret == loginRequest.Password
        );

        if (user != null)
        {
            var totpToken = context.TotpTokens.Add(new TotpToken
            {
                Id = Guid.Empty,
                User = user
            });
            await context.SaveChangesAsync();
            response = Ok(new LoginResponse { TotpToken = totpToken.Entity.Id });
        }
        else
        {
            response = BadRequest();
        }

        var delay = targetMilliseconds - (int)stopwatch.ElapsedMilliseconds;

        if (delay > 0)
        {
            await Task.Delay(delay);
        }

        return response;
    }

    [HttpPost("totp", Name = "PostTotp")]
    public async Task<IActionResult> Totp([FromBody] TotpRequest totpRequest)
    {
        await using var context = new AppDbContext();
        var stopwatch = Stopwatch.StartNew();
        IActionResult response;

        var totpToken = await context.TotpTokens
            .Include(totpTokens => totpTokens.User)
            .ThenInclude(user => user.Totp)
            .SingleOrDefaultAsync(
                t => t.Id == totpRequest.TotpToken
            );

        if (totpToken != null)
        {
            var totp = new OtpNet.Totp(totpToken.User.Totp.Secret);
            var isValid = totp.VerifyTotp(totpRequest.Secret, out _);
            if (isValid)
            {
                var token = context.UserTokens.Add(new UserToken
                {
                    Id = Guid.Empty,
                    User = totpToken.User
                });
                await context.SaveChangesAsync();
                response = Ok(new TotpResponse
                {
                    Token = token.Entity.Id
                });
            }
            else
            {
                response = BadRequest();
            }
        }
        else
        {
            response = BadRequest();
        }

        var delay = targetMilliseconds - (int)stopwatch.ElapsedMilliseconds;

        if (delay > 0)
        {
            await Task.Delay(delay);
        }

        return response;
    }

    [HttpPost("logout", Name = "PostLogout")]
    public async Task<IActionResult> Logout([FromBody] LogoutRequest logoutRequest)
    {
        await using var context = new AppDbContext();
        var stopwatch = Stopwatch.StartNew();
        IActionResult response;

        if (Guid.TryParse(logoutRequest.Token, out var token))
        {
            var userToken = await context.UserTokens.SingleOrDefaultAsync(t => t.Id == token);

            if (userToken != null)
            {
                response = Ok();
                context.UserTokens.Remove(userToken);
                await context.SaveChangesAsync();
            }
            else
            {
                response = BadRequest();
            }
        }
        else
        {
            response = BadRequest();
        }

        var delay = targetMilliseconds - (int)stopwatch.ElapsedMilliseconds;

        if (delay > 0)
        {
            await Task.Delay(delay);
        }

        return response;
    }

    [HttpPost("salt", Name = "PostSalt")]
    public async Task<IActionResult> Salt([FromBody] SaltRequest saltRequest)
    {
        await using var context = new AppDbContext();
        var stopwatch = Stopwatch.StartNew();
        IActionResult response;
        var randomSalt = RandomNumberGenerator.GetBytes(16);

        var user = await context.Users.Include(user => user.Password).SingleOrDefaultAsync(
            u => u.Login == saltRequest.User
        );

        if (user != null)
        {
            response = Ok(new SlatResponse
            {
                Salt = user.Password.Salt
            });
        }
        else
        {
            response = Ok(new SlatResponse
            {
                Salt = Convert.ToBase64String(randomSalt)
            });
        }

        var delay = targetMilliseconds - (int)stopwatch.ElapsedMilliseconds;

        if (delay > 0)
        {
            await Task.Delay(delay);
        }

        return response;
    }

    [HttpPost("register", Name = "PostRegister")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest registerRequest)
    {
        await using var context = new AppDbContext();
        var stopwatch = Stopwatch.StartNew();
        IActionResult response;

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

        response = Ok(new RegisterResponse
        {
            Secret =
                $"otpauth://totp/Panel:{user.Entity.Login}?secret={Base32Encoding.ToString(totp.Entity.Secret)}&issuer=Panel"
        });

        await context.SaveChangesAsync();

        var delay = targetMilliseconds - (int)stopwatch.ElapsedMilliseconds;

        if (delay > 0)
        {
            await Task.Delay(delay);
        }

        return response;
    }
}