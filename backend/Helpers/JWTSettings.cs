namespace Helpers
{
  public class JWTSettings
  {
    public string Key { get; set; } = string.Empty;
    public string Issuer { get; set; } = string.Empty;
    public string Audience { get; set; } = string.Empty;
    public int DurationInMinutes { get; set; } = 0;
    public TimeSpan Expires => TimeSpan.FromMinutes(DurationInMinutes);

  }
}