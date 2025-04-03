using Login_Panel.API;

namespace Login_Panel.Domain.Features.Authentication.Services;

public class LockoutService: ILockoutService
{
    private readonly ILogger<LockoutService> _logger;
    private readonly AppDbContext _appDbContext;
    
    public LockoutService(ILogger<LockoutService> logger, AppDbContext appDbContext)
    {
        _logger = logger;
        _appDbContext = appDbContext;
    }
    
    public bool IsUserLockedOut(User? user, string honeypotLogin = "")
    {
        var referenceLockTimestamp = DateTime.UtcNow.AddMinutes(-60);
        var referenceAttemptTimestamp = DateTime.UtcNow.AddMinutes(-15);

        if (user != null)
        {
            if (IsUserAccountHasLock(user, referenceLockTimestamp)) return true;
            if (IsUserAccountHasTooManyAttempts(user, referenceAttemptTimestamp)) return false;
            LockUserAccount(user);
            return true;
        }

        if (IsUserAccountHasLock(honeypotLogin, referenceLockTimestamp)) return true;
        if (IsUserAccountHasTooManyAttempts(honeypotLogin, referenceAttemptTimestamp)) return false;
        LockUserAccount(honeypotLogin);
        return true;
    }
    public bool IsUserAccountHasLock(User user, DateTime referenceLockTimestamp)
    {
        return _appDbContext.UserAccountLocks.Any(l => l.User == user && l.Until > referenceLockTimestamp);
    }

    public bool IsUserAccountHasLock(string user, DateTime referenceLockTimestamp)
    {
        return _appDbContext.UserAccountHoneypotLocks.Any(l => l.User == user && l.Until > referenceLockTimestamp);
    }

    public bool IsUserAccountHasTooManyAttempts(User user, DateTime referenceAttemptTimestamp)
    {
        return _appDbContext.UserLoginAttempts.Count(a => a.User == user && a.TimeStamp > referenceAttemptTimestamp) <
               2;
    }

    public bool IsUserAccountHasTooManyAttempts(string user, DateTime referenceAttemptTimestamp)
    {
        return _appDbContext.UserLoginHoneypotAttempts.Count(a =>
            a.User == user && a.TimeStamp > referenceAttemptTimestamp) < 2;
    }

    public void LockUserAccount(User user)
    {
        var userAccountLocks = _appDbContext.UserAccountLocks.Add(new UserAccountLock
        {
            Id = Guid.Empty,
            Until = DateTime.UtcNow.AddMinutes(60),
            User = user
        });

        _appDbContext.SaveChanges();
    }

    public void LockUserAccount(string user)
    {
        var userAccountHoneypotLocks = _appDbContext.UserAccountHoneypotLocks.Add(new UserAccountHoneypotLock
        {
            Id = Guid.Empty,
            Until = DateTime.UtcNow.AddMinutes(60),
            User = user
        });

        _appDbContext.SaveChanges();
    }
}