using FluentValidation;
using Master_Fraud.Domain.Features.Authentication.DTOs;

namespace Master_Fraud.API.Features.Authentication.Validators;

public class LogoutRequestValidator : AbstractValidator<LogoutRequest>
{
    public LogoutRequestValidator()
    {
        RuleFor(x => x.Token)
            .NotEmpty().WithMessage("Token cannot be empty.");
    }
}