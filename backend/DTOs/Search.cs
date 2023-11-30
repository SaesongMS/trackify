using Models;

namespace DTOs;

public class SearchResponse
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public List<UserProfile> Users { get; set; } = new List<UserProfile>();
    public List<Song> Songs { get; set; } = new List<Song>();
    public List<Album> Albums { get; set; } = new List<Album>();
    public List<Artist> Artists { get; set; } = new List<Artist>();
}

public class UserProfile
{
    public string Id { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    public byte[] ProfilePicture { get; set; } = Array.Empty<byte>();
}