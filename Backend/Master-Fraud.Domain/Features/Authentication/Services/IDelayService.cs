using Microsoft.AspNetCore.Mvc;

namespace Master_Fraud.Domain.Features.Authentication.Services;

public interface IDelayService
{
    Task<IActionResult> FakeDelay(Func<IActionResult> func);
}