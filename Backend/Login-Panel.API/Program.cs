using Login_Panel.Domain.Features.Authentication.Services;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

namespace Login_Panel.API;

public static class Program
{
    public static async Task Main(string[] args)
    {
        var dbContainer = new DockerStarter();
        await dbContainer.StartPostgresAsync();

        var builder = WebApplication.CreateBuilder(args);

        const string secureCorsPolicy = "SecureCorsPolicy";
        builder.Services.AddCors(options =>
        {
            options.AddPolicy(secureCorsPolicy, policy =>
            {
                policy.WithOrigins("http://localhost:4200") 
                    .WithHeaders("Content-Type", "Authorization", "X-Totp-Token", "X-Secret")
                    .WithMethods("GET", "POST", "OPTIONS") 
                    .SetPreflightMaxAge(TimeSpan.FromHours(2));
            });
        });


        // Add services to the container.
        builder.Services.AddDbContext<IAppDbContext, AppDbContext>();
        builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
        builder.Services.AddScoped<ILockoutService, LockoutService>();
        builder.Services.AddScoped<IDatabaseService, DatabaseService>();
        builder.Services.AddScoped<IDelayService, DelayService>();
        builder.Services.AddControllers();
        // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
        builder.Services.AddOpenApi();

        var app = builder.Build();

        var databaseUpdater = new DatabaseUpdater(app.Services);
        await databaseUpdater.PerformDatabaseUpdate();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            app.MapScalarApiReference();
        }
        
        app.UseCors(secureCorsPolicy);

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        await app.RunAsync();
    }
}