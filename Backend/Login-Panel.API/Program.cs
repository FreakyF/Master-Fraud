using Login_Panel.Domain.Features.Authentication.Services;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

namespace Login_Panel.API;

public class Program
{
    public static async Task Main(string[] args)
    {
        var dbContainer = new DockerStarter();
        await dbContainer.StartPostgresAsync();

        var builder = WebApplication.CreateBuilder(args);

        const string allowSpecificOrigins = "LoginPanelFront";
        builder.Services.AddCors(options =>
        {
            options.AddPolicy(allowSpecificOrigins,
                policy =>
                {
                    policy.WithOrigins("*")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
        });

        // Add services to the container.
        builder.Services.AddDbContext<IAppDbContext, AppDbContext>(options =>
            options.UseNpgsql(
                builder.Configuration.GetConnectionString(
                    "Host=localhost;Port=55123;Database=panel;Username=postgres;Password=admin")));
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

        app.UseCors(allowSpecificOrigins);

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        await app.RunAsync();
    }
}