using System;
using FluentValidation;

namespace Login_Panel.API.Features.Authentication.Validators;

public class LogoutRequestValidator : AbstractValidator<LogoutRequest>
{
    public LogoutRequestValidator()
    {
        RuleFor(x => x.Token)
            .NotEmpty().WithMessage("Token cannot be empty.")
            .Must(IsAValidGuid).WithMessage("Token must be a valid GUID.");
    }

    private static bool IsAValidGuid(string token)
    {
        return Guid.TryParse(token, out _);
    }
}