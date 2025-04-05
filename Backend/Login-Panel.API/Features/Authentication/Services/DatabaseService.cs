using Login_Panel.API;

namespace Login_Panel.Domain.Features.Authentication.Services;

public class DatabaseService: IDatabaseService
{
    private readonly ILogger<DatabaseService> _logger;
    private readonly AppDbContext _appDbContext;
    
    public DatabaseService(ILogger<DatabaseService> logger, AppDbContext appDbContext)
    {
        _logger = logger;
        _appDbContext = appDbContext;
    }
    
    public Guid CreateTotpToken(User user)
    {
        var totpToken = _appDbContext.TotpTokens.Add(new TotpToken
        {
            Id = Guid.Empty,
            User = user
        });

        _appDbContext.SaveChanges();

        return totpToken.Entity.Id;
    }

    public void LogLoginAttempt(User user)
    {
        var userLoginAttempt = _appDbContext.UserLoginAttempts.Add(new UserLoginAttempt
        {
            Id = Guid.Empty,
            TimeStamp = DateTime.UtcNow,
            User = user
        });

        _appDbContext.SaveChanges();
    }

    public void LogLoginAttempt(string user)
    {
        var userLoginHoneypotAttempt = _appDbContext.UserLoginHoneypotAttempts.Add(new UserLoginHoneypotAttempt
        {
            Id = Guid.Empty,
            TimeStamp = DateTime.UtcNow,
            User = user
        });

        _appDbContext.SaveChanges();
    }
    
    public Guid GenerateUserToken(User user)
    {
        var token = _appDbContext.UserTokens.Add(new UserToken
        {
            Id = Guid.Empty,
            User = user
        });

        _appDbContext.SaveChanges();

        return token.Entity.Id;
    }
}