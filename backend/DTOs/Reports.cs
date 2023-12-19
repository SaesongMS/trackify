using System.ComponentModel.DataAnnotations;
using Models;

namespace DTOs;

public class SubjectCountRequest
{
    [Required]
    public DateTime StartDate { get; set; } = DateTime.Now.ToUniversalTime();
    [Required]
    public DateTime EndDate { get; set; } = DateTime.Now.ToUniversalTime();
    [Required]
    public string UserId { get; set; } = string.Empty;
}

public class SubjectCountResponse
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public int SongCount { get; set; } = 0;
    public int AlbumCount { get; set; } = 0;
    public int ArtistCount { get; set; } = 0;
}

public class InfoRequest
{
    [Required]
    public DateTime StartDate { get; set; } = DateTime.Now.ToUniversalTime();
    [Required]
    public DateTime EndDate { get; set; } = DateTime.Now.ToUniversalTime();
    [Required]
    public string UserId { get; set; } = string.Empty;
}

public class InfoResponse
{
    public bool Success { get; set; } = false;
    public string Message { get; set; } = string.Empty;
    public int TotalScrobbles { get; set; } = 0;
    public int AverageScrobblesPerDay { get; set; } = 0;
    public TimeOnly MostActiveHour { get; set; } = new TimeOnly();
}

public class TopUsersRequest
{
    [Required]
    public DateTime StartDate { get; set; } = DateTime.Now.ToUniversalTime();
    [Required]
    public DateTime EndDate { get; set; } = DateTime.Now.ToUniversalTime();
    [Required]
    public string UserId { get; set; } = string.Empty;
    public int Limit { get; set; } = 5;
}

public class TopUsers
{
    public User User { get; set; } = new User();
    public int ScrobbleCount { get; set; } = 0;

}

public class TopUsersResponse
{
    public bool Success { get; set; } = false;
    public string Message { get; set; } = string.Empty;
    public List<TopUsers> TopUsers { get; set; } = new List<TopUsers>();
}

public class CountByDayRequest
{
    [Required]
    public DateTime StartDate { get; set; } = DateTime.Now.ToUniversalTime();
    [Required]
    public DateTime EndDate { get; set; } = DateTime.Now.ToUniversalTime();
    [Required]
    public string UserId { get; set; } = string.Empty;
}

public class CountByDay
{
    public DateTime Date { get; set; } = DateTime.Now.ToUniversalTime();
    public int Count { get; set; } = 0;
}

public class CountByDayResponse
{
    public bool Success { get; set; } = false;
    public string Message { get; set; } = string.Empty;
    public List<CountByDay> CountByDay { get; set; } = new List<CountByDay>();
}