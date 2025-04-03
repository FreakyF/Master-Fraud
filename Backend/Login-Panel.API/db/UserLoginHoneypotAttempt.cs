namespace Login_Panel.API;

public class UserLoginHoneypotAttempt
{
    public Guid Id { get; init; }
    public string User { get; set; }
    public DateTime TimeStamp { get; set; }
}