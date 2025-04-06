using System.Text;
using Login_Panel.API;
using Login_Panel.Domain.Features.Authentication.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace FuzzTest;

public static class Program
{
    private static IServiceProvider _serviceProvider = null!;

    public static void Main(string[] args)
    {
        ConfigureServices();
    }

    private static void ConfigureServices()
    {
        var services = new ServiceCollection();

        var dbName = $"FuzzTestDb_{Guid.NewGuid()}";
        services.AddDbContext<AppDbContext>(options =>
            options.UseInMemoryDatabase(dbName));

        services.AddScoped<IDatabaseService, DatabaseService>();
        services.AddScoped<ILockoutService, LockoutService>();
        services.AddScoped<IDelayService, DelayService>();
        services.AddScoped<IAuthenticationService, AuthenticationService>();

        _serviceProvider = services.BuildServiceProvider();
    }

    private static void FuzzLogin(ReadOnlySpan<byte> data)
    {
        using var scope = _serviceProvider.CreateScope();
        var authService = scope.ServiceProvider.GetRequiredService<IAuthenticationService>();

        string login;
        string password;

        try
        {
            var middle = data.Length / 2;
            login = Encoding.UTF8.GetString(data[..middle]);
            password = Encoding.UTF8.GetString(data[middle..]);

            if (string.IsNullOrWhiteSpace(login)) login = "fuzz_user";
            if (string.IsNullOrWhiteSpace(password)) password = "fuzz_pass";
        }
        catch (ArgumentException)
        {
            return;
        }

        var request = new LoginRequest
        {
            Login = login,
            Password = password
        };

        try
        {
            authService.LoginHandler(request);
        }
        catch (Exception ex)
        {
            if (ex is DbUpdateException or InvalidOperationException)
            {
                return;
            }

            throw;
        }
    }
}