using System.ComponentModel.DataAnnotations;
using Models;

namespace DTOs;

public class RecentScrobblesRequest
{
    [Required]
    public int N { get; set; } = 1;
}

public class RecentScrobblesResponse
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public List<Scrobble> Scrobbles { get; set; } = new List<Scrobble>();
}

public class IntervalScrobblesRequest
{
    [Required]
    public DateTime Start { get; set; } = DateTime.Now;
    public DateTime End { get; set; } = DateTime.Now;
    
}

public class IntervalScrobblesResponse
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public List<Scrobble> Scrobbles { get; set; } = new List<Scrobble>();
}