using System;
using System.Threading.Tasks;
using Login_Panel.Infrastructure.Persistence.DatabaseContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Login_Panel.API;

public class DatabaseUpdater
{
    private readonly IServiceProvider _serviceProvider;

    public DatabaseUpdater(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }
    
    public async Task PerformDatabaseUpdate()
    {
        using var scope = _serviceProvider.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        
        await dbContext.Database.MigrateAsync();
    }
}