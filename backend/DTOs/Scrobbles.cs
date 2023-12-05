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
    public string Id { get; set; } = string.Empty;
    public DateTime Start { get; set; } = DateTime.Now.ToUniversalTime();
    public DateTime End { get; set; } = DateTime.Now.ToUniversalTime();
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}

public class IntervalScrobblesResponse
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public List<ScrobbleWithRating> Scrobbles { get; set; } = new List<ScrobbleWithRating>();
    public int TotalCount { get; set; } = 0;
    public int TotalPages { get; set; } = 0;
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}

public class NIntervalScrobblesRequest
{
    [Required]
    public DateTime Start { get; set; } = DateTime.Now;
    public DateTime End { get; set; } = DateTime.Now;
    [Required]
    public int N { get; set; } = 1;

}

public class NIntervalTopUserScrobblesRequest
{
    [Required]
    public DateTime Start { get; set; } = DateTime.Now;
    public DateTime End { get; set; } = DateTime.Now;
    [Required]
    public string Id { get; set; } = string.Empty;
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}

public class NTopUserScrobblesRequest
{
    [Required]
    public int N { get; set; } = 1;
    [Required]
    public string Id { get; set; }
}

public class NIntervalTopScrobblesRequest
{
    [Required]
    public DateTime Start { get; set; } = DateTime.Now;
    public DateTime End { get; set; } = DateTime.Now;
    [Required]
    public int N { get; set; } = 1;
}

public class NTopScrobblesRequest
{
    [Required]
    public int N { get; set; } = 1;
}
public class NIntervalScrobblesResponse
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public List<ScrobbleWithRating> Scrobbles { get; set; } = new List<ScrobbleWithRating>();
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

public class DeleteScrobbleRequest
{
    [Required]
    public string Id { get; set; } = string.Empty;
}

public class DeleteScrobbleResponse
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
}

public class TopNSongsScrobblesResponse
{
    public List<SongScrobbleCount> Songs { get; set; }
    public bool Success { get; set; }
}

public class TopNSongsScrobblesPaginateResponse
{
    public List<SongScrobbleCount> Songs { get; set; }
    public bool Success { get; set; }
    public int TotalCount { get; set; }
    public int TotalPages { get; set; }
}
public class TopNAlbumsScrobblesPaginateResponse
{
    public List<AlbumScrobbleCount> Albums { get; set; }
    public bool Success { get; set; }
    public int TotalCount { get; set; }
    public int TotalPages { get; set; }
}
public class TopNArtistsScrobblesPaginateResponse
{
    public List<ArtistScrobbleCount> Artists { get; set; }
    public bool Success { get; set; }
    public int TotalCount { get; set; }
    public int TotalPages { get; set; }
}
public class SongScrobbleCount
{
    public Song Song { get; set; }
    public int Count { get; set; }
    public double AvgRating { get; set; }
}

public class ScrobbleWithRating
{
    public Scrobble Scrobble { get; set; }
    public double AvgRating { get; set; }
}

public class TopNAlbumsScrobblesResponse
{
    public List<AlbumScrobbleCount> Albums { get; set; }
    public bool Success { get; set; }
}
public class AlbumScrobbleCount
{
    public Album Album { get; set; }
    public int Count { get; set; }
    public double AvgRating { get; set; }
}
public class TopNArtistsScrobblesResponse
{
    public List<ArtistScrobbleCount> Artists { get; set; }
    public bool Success { get; set; }
}
public class ArtistScrobbleCount
{
    public Artist Artist { get; set; }
    public int Count { get; set; }
    public double AvgRating { get; set; }
}

public class SongResponse
{
    public Song Song { get; set; }
    public int ScrobbleCount { get; set; }
    public int ListenersCount { get; set; }

    public double AvgRating { get; set; }

    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
}

public class AlbumResponse
{
    public Album Album { get; set; }
    public int ScrobbleCount { get; set; }
    public int ListenersCount { get; set; }
    public double AvgRating { get; set; }
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
}

public class ArtistResponse
{
    public Artist Artist { get; set; }
    public int ScrobbleCount { get; set; }
    public int ListenersCount { get; set; }
    public double AvgRating { get; set; }
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
}

public class NIntervalTopSongsByArtistRequest
{
    [Required]
    public DateTime Start { get; set; } = DateTime.Now;
    public DateTime End { get; set; } = DateTime.Now;
    [Required]
    public int N { get; set; } = 1;
    [Required]
    public string ArtistId { get; set; } = string.Empty;
}

public class CollageRequest
{
    //time period, size
    [Required]
    public DateTime Start { get; set; } = DateTime.Now;
    public DateTime End { get; set; } = DateTime.Now;
    [Required]
    public int Size { get; set; } = 1;
    [Required]
    public string Subject { get; set; } = "artist";
}

public class CollageResponse
{
    public byte[] Collage { get; set; }
    public bool Success { get; set; }
}