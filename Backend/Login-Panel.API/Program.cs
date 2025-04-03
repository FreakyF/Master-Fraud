using Login_Panel.Domain.Features.Authentication.Services;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

namespace Login_Panel.API;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddDbContext<IAppDbContext, AppDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("Host=localhost;Port=55123;Database=panel;Username=postgres;Password=admin")));
        builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
        builder.Services.AddScoped<ILockoutService, LockoutService>();
        builder.Services.AddScoped<IDatabaseService, DatabaseService>();
        builder.Services.AddScoped<IDelayService, DelayService>();
        builder.Services.AddControllers();
        // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
        builder.Services.AddOpenApi();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            app.MapScalarApiReference();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}