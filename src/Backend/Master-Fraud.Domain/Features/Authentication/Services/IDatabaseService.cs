using Master_Fraud.Domain.Features.Authentication.Entities;

namespace Master_Fraud.Domain.Features.Authentication.Services;

public interface IDatabaseService
{
    Guid CreateTotpToken(User user);
    void LogLoginAttempt(User user);
    void LogLoginAttempt(string user);
    Guid GenerateUserToken(User user);
}