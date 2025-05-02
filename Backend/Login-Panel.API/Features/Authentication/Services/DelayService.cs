using System;
using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Login_Panel.Domain.Features.Authentication.Services;

public class DelayService : IDelayService
{
    private const int TargetMilliseconds = 100;

    public async Task<IActionResult> FakeDelay(Func<IActionResult> func)
    {
        var stopwatch = Stopwatch.StartNew();

        var result = func();

        var delay = TargetMilliseconds - (int)stopwatch.ElapsedMilliseconds;
        if (delay > 0)
        {
            await Task.Delay(delay);
        }

        return result;
    }
}