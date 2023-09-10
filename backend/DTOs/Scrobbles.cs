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

public class NIntervalScrobblesRequest
{
    [Required]
    public DateTime Start { get; set; } = DateTime.Now;
    public DateTime End { get; set; } = DateTime.Now;
    [Required]
    public int N { get; set; } = 1;
    
}

public class NIntervalScrobblesResponse
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public List<Scrobble> Scrobbles { get; set; } = new List<Scrobble>();
}

public class CreateScrobbleRequest
{
    [Required]
    public string Id_Song_Spotify_Api { get; set; } = string.Empty;
    [Required]
    public string Id_Album_Spotify_Api { get; set; } = string.Empty;
    [Required]
    public string Id_Artist_Spotify_Api { get; set; } = string.Empty;
    [Required]
    public string User_Id { get; set; } = string.Empty;
}

public class CreateScrobbleResponse
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
}

