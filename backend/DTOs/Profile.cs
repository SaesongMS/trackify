using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Models;
using Services;

namespace DTOs;

public class ProfileResponse
{
    public string Id { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    public byte[] ProfilePicture { get; set; } = new byte[0];
    public string Description { get; set; } = string.Empty;
    public List<Follows> Followers { get; set; } = new List<Follows>();
    public List<Follows> Following { get; set; } = new List<Follows>();
    public List<ProfileComments> ProfileComments { get; set; } = new List<ProfileComments>();
    public List<Scrobbles> Scrobbles { get; set; } = new List<Scrobbles>();
    public List<RatedSongs> RatedSongs { get; set; } = new List<RatedSongs>();
    public List<RatedAlbums> RatedAlbums { get; set; } = new List<RatedAlbums>();
    public List<RatedArtists> RatedArtists { get; set; } = new List<RatedArtists>();
    public List<FavouriteSongs> FavouriteSongs { get; set; } = new List<FavouriteSongs>();
}

public class Follows
{
    public string Id { get; set; } = string.Empty;
    public string Id_Follower { get; set; } = string.Empty;
    public string Id_Followed { get; set; } = string.Empty;

}

public class ProfileComments
{
    public string Id { get; set; } = string.Empty;
    public string Comment { get; set; } = string.Empty;
    public DateTime Creation_Date { get; set; } = DateTime.Now;

    public string Id_Sender { get; set; } = string.Empty;

    public string Id_Recipient { get; set; } = string.Empty;
    public Sender Sender { get; set; } = null!;
}

public class Scrobbles
{
    public string Id { get; set; } = string.Empty;
    public DateTime Scrobble_Date { get; set; }

    public string Id_User { get; set; } = string.Empty;
    public string Id_Song_Internal { get; set; } = string.Empty;
    public Song Song { get; set; } = null!;
}

public class RatedSongs
{
    public string Id_Song { get; set; } = string.Empty;
    public int Rating { get; set; }
    public string Id_Song_Internal { get; set; } = string.Empty;
    public Song Song { get; set; } = null!;
}

public class RatedAlbums
{
    public string Id_Album { get; set; } = string.Empty;
    public int Rating { get; set; }
    public string Id_Album_Internal { get; set; } = string.Empty;
    public Album Album { get; set; } = null!;
}

public class RatedArtists
{
    public string Id_Artist { get; set; } = string.Empty;
    public int Rating { get; set; }
    public string Id_Artist_Internal { get; set; } = string.Empty;
    public Artist Artist { get; set; } = null!;
}

public class FavouriteSongs
{
    public string Id_Song { get; set; } = string.Empty;
    public string Id_Song_Internal { get; set; } = string.Empty;
    public Song Song { get; set; } = null!;
}
public class EditUsersProfileRequest
{
    public string Bio { get; set; } = string.Empty;

    public string Avatar { get; set; } = string.Empty;
}

public class Sender
{
    public string Id { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    public byte[] ProfilePicture { get; set; } = new byte[0];
}
