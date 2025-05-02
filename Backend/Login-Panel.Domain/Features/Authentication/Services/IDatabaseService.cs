using Login_Panel.Domain.Features.Authentication.Entities;

namespace Login_Panel.Domain.Features.Authentication.Services;

public interface IDatabaseService
{
    Guid CreateTotpToken(User user);
    void LogLoginAttempt(User user);
    void LogLoginAttempt(string user);
    Guid GenerateUserToken(User user);
}