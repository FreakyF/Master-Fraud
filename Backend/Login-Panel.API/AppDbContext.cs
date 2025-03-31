using Microsoft.EntityFrameworkCore;

namespace Login_Panel.API;

public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Password> Passwords { get; set; }
    public DbSet<Totp> Totps { get; set; }
    public DbSet<UserToken> UserTokens { get; set; }
    public DbSet<TotpToken> TotpTokens { get; set; }
    public DbSet<HoneypotSalt> HoneypotSalts { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("Host=localhost;Port=55000;Database=panel;Username=postgres;Password=admin");
    }
}