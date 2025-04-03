namespace Login_Panel.API;

public class UserLoginAttempt
{
    public Guid Id { get; init; }
    public User User { get; set; }
    public DateTime TimeStamp { get; set; }
}