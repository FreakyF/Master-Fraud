using FluentValidation;
using Login_Panel.Domain.Features.Authentication.DTOs;

namespace Login_Panel.API.Features.Authentication.Validators;

public class LogoutRequestValidator : AbstractValidator<LogoutRequest>
{
    public LogoutRequestValidator()
    {
        RuleFor(x => x.Token)
            .NotEmpty().WithMessage("Token cannot be empty.");
    }
}