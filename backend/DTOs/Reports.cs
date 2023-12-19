using System.ComponentModel.DataAnnotations;
using Models;

namespace DTOs;

public class ReportRequest
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

public class InfoResponse
{
    public bool Success { get; set; } = false;
    public string Message { get; set; } = string.Empty;
    public int TotalScrobbles { get; set; } = 0;
    public int AverageScrobblesPerDay { get; set; } = 0;
    public TimeOnly MostActiveHour { get; set; } = new TimeOnly();
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

public class CountByDay
{
    public DateOnly Date { get; set; } = new DateOnly();
    public string DayOfWeek { get; set; } = string.Empty;
    public int Count { get; set; } = 0;
}

public class CountByDayResponse
{
    public bool Success { get; set; } = false;
    public string Message { get; set; } = string.Empty;
    public List<CountByDay> CountByDay { get; set; } = new List<CountByDay>();
}

public class CountByWeek
{
    public DateOnly StartDate { get; set; } = new DateOnly();
    public DateOnly EndDate { get; set; } = new DateOnly();
    public int Count { get; set; } = 0;
}

public class CountByWeekResponse
{
    public bool Success { get; set; } = false;
    public string Message { get; set; } = string.Empty;
    public List<CountByWeek> CountByWeek { get; set; } = new List<CountByWeek>();
}

public class CountByMonth
{
    public int Month { get; set; } = 0;
    public int Year { get; set; } = 0;
    public int Count { get; set; } = 0;
}

public class CountByMonthResponse
{
    public bool Success { get; set; } = false;
    public string Message { get; set; } = string.Empty;
    public List<CountByMonth> CountByMonth { get; set; } = new List<CountByMonth>();
}
