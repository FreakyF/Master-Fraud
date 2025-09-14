using System;
using System.Diagnostics;
using System.Threading.Tasks;
using Master_Fraud.Domain.Features.Authentication.Services;
using Microsoft.AspNetCore.Mvc;

namespace Master_Fraud.API.Features.Authentication.Services;

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