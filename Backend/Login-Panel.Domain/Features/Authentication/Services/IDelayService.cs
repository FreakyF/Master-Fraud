using Microsoft.AspNetCore.Mvc;

namespace Login_Panel.Domain.Features.Authentication.Services;

public interface IDelayService
{
    Task<IActionResult> FakeDelay(Func<IActionResult> func);
}