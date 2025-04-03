using System.Diagnostics;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Http.HttpResults;
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

    private const int TargetMilliseconds = 100;

    public AuthController(ILogger<AuthController> logger)
    {
        _logger = logger;
    }

    private static async Task<IActionResult> FakeDelay(Func<IActionResult> func)
    {
        var stopwatch = Stopwatch.StartNew();

        var result = func();

        var delay = TargetMilliseconds - (int)stopwatch.ElapsedMilliseconds;
        if (delay > 0)
        {
            await Task.Delay(delay);
        }

        return result;
    }

    [HttpPost("login", Name = "PostLogin")]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    {
        return await FakeDelay(() => LoginHandler(loginRequest));
    }

    private IActionResult LoginHandler(LoginRequest loginRequest)
    {
        using var context = new AppDbContext();

        var user = context.Users
            .Include(user => user.Password)
            .SingleOrDefault(u => u.Login == loginRequest.Login);

        if (IsUserLockedOut(user, loginRequest.Login)) return NotFound();

        if (user != null && user.Password.Secret != loginRequest.Password)
        {
            var userLoginAttempt = context.UserLoginAttempts.Add(new UserLoginAttempt
            {
                Id = Guid.Empty,
                TimeStamp = DateTime.UtcNow,
                User = user
            });

            context.SaveChanges();

            return BadRequest();
        }

        if (user == null)
        {
            var userLoginHoneypotAttempt = context.UserLoginHoneypotAttempts.Add(new UserLoginHoneypotAttempt
            {
                Id = Guid.Empty,
                TimeStamp = DateTime.UtcNow,
                User = loginRequest.Login
            });

            context.SaveChanges();

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

    private bool IsUserLockedOut(User? user, string honeypotLogin = "")
    {
        using var context = new AppDbContext();

        var referenceLockTimestamp = DateTime.UtcNow.AddMinutes(-60);
        var referenceAttemptTimestamp = DateTime.UtcNow.AddMinutes(-15);

        if (user != null)
        {
            if (context.UserAccountLocks
                .Any(l => l.User == user && l.Until > referenceLockTimestamp)) return true;

            if (context.UserLoginAttempts
                    .Count(a => a.User == user && a.TimeStamp > referenceAttemptTimestamp) < 2) return false;

            var userAccountLocks = context.UserAccountLocks.Add(new UserAccountLock
            {
                Id = Guid.Empty,
                Until = DateTime.UtcNow.AddMinutes(60),
                User = user
            });

            context.SaveChanges();

            return true;
        }

        if (context.UserAccountHoneypotLocks
            .Any(l => l.User == honeypotLogin && l.Until > referenceLockTimestamp)) return true;

        if (context.UserLoginHoneypotAttempts
                .Count(a => a.User == honeypotLogin && a.TimeStamp > referenceAttemptTimestamp) < 2) return false;

        var userAccountHoneypotLocks = context.UserAccountHoneypotLocks.Add(new UserAccountHoneypotLock
        {
            Id = Guid.Empty,
            Until = DateTime.UtcNow.AddMinutes(60),
            User = honeypotLogin
        });

        context.SaveChanges();

        return true;
    }

    [HttpPost("totp", Name = "PostTotp")]
    public async Task<IActionResult> Totp([FromBody] TotpRequest totpRequest)
    {
        return await FakeDelay(() => TotpHandler(totpRequest));
    }

    private IActionResult TotpHandler(TotpRequest totpRequest)
    {
        using var context = new AppDbContext();

        var totpToken = context.TotpTokens
            .Include(totpTokens => totpTokens.User)
            .ThenInclude(user => user.Totp)
            .SingleOrDefault(
                t => t.Id == totpRequest.TotpToken
            );

        if (totpToken == null) return BadRequest();

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
    public async Task<IActionResult> Logout([FromBody] LogoutRequest logoutRequest)
    {
        return await FakeDelay(() => LogoutHandler(logoutRequest));
    }

    private IActionResult LogoutHandler(LogoutRequest logoutRequest)
    {
        using var context = new AppDbContext();

        if (!Guid.TryParse(logoutRequest.Token, out var token)) return BadRequest();

        var userToken = context.UserTokens.SingleOrDefault(t => t.Id == token);

        if (userToken == null) return BadRequest();

        context.UserTokens.Remove(userToken);
        context.SaveChangesAsync();

        return Ok();
    }

    [HttpPost("salt", Name = "PostSalt")]
    public async Task<IActionResult> Salt([FromBody] SaltRequest saltRequest)
    {
        return await FakeDelay(() => SaltHandler(saltRequest));
    }

    private IActionResult SaltHandler(SaltRequest saltRequest)
    {
        using var context = new AppDbContext();

        var randomSalt = BCrypt.Net.BCrypt.GenerateSalt(10);

        var user = context.Users.Include(user => user.Password).SingleOrDefault(
            u => u.Login == saltRequest.User
        );

        var honeypotSalt = context.HoneypotSalts.SingleOrDefault(
            u => u.Login == saltRequest.User
        );

        if (user != null)
        {
            return Ok(new SlatResponse
            {
                Salt = user.Password.Salt
            });
        }

        if (honeypotSalt != null)
        {
            return Ok(new SlatResponse
            {
                Salt = honeypotSalt.Salt
            });
        }

        var newHoneypotSalt = context.HoneypotSalts.Add(new HoneypotSalt
        {
            Id = Guid.Empty,
            Login = saltRequest.User,
            Salt = randomSalt
        });

        context.SaveChanges();

        return Ok(new SlatResponse
        {
            Salt = newHoneypotSalt.Entity.Salt
        });
    }

    [HttpPost("register", Name = "PostRegister")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest registerRequest)
    {
        return await FakeDelay(() => RegisterHandler(registerRequest));
    }

    private IActionResult RegisterHandler(RegisterRequest registerRequest)
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