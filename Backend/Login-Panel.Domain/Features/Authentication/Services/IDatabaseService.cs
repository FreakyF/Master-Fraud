using Login_Panel.API;

namespace Login_Panel.Domain.Features.Authentication.Services;

public interface IDatabaseService
{
    Guid CreateTotpToken(User user);
    void LogLoginAttempt(User user);
    void LogLoginAttempt(string user);
    Guid GenerateUserToken(User user);
    string CreateHoneypotSalt(string user, string randomSalt);
}