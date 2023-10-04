using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using Helpers;
using Services;

namespace Models
{
  [Table("users")]
  public class User : IdentityUser
  {
    public string RefreshToken { get; internal set; } = string.Empty;
    public byte[] Avatar { get; internal set; } = AuthenticationService.getDeafultAvatar();
    public string Bio { get; internal set; } = string.Empty;
    public string Id_User_Spotify_API { get; internal set; } = string.Empty;

    public ICollection<Follow> Follows { get; set; } = new List<Follow>();
    public ICollection<ProfileComment> ProfileComments { get; set; } = new List<ProfileComment>();
    public ICollection<FavouriteSong> FavouriteSongs { get; set; } = new List<FavouriteSong>();
    public ICollection<SongComment> SongComments { get; set; } = new List<SongComment>();
    public ICollection<SongRating> SongRatings { get; set; } = new List<SongRating>();
    public ICollection<AlbumRating> AlbumRatings { get; set; } = new List<AlbumRating>();
    public ICollection<AlbumComment> AlbumComments { get; set; } = new List<AlbumComment>();
    public ICollection<ArtistRating> ArtistRatings { get; set; } = new List<ArtistRating>();
    public ICollection<ArtistComment> ArtistComments { get; set; } = new List<ArtistComment>();

    public ICollection<Scrobble> Scrobbles { get; set; } = new List<Scrobble>();
  }

  [Table("follows")]
  public class Follow
  {
    public string Id { get; set; } = string.Empty;

    public string Id_Follower { get; set; } = string.Empty;
    public User Follower { get; set; } = null!;

    public string Id_Followed { get; set; } = string.Empty;
  }

  [Table("profileComments")]
  public class ProfileComment
  {
    public string Id { get; set; } = string.Empty;
    public string Comment { get; set; } = string.Empty;
    public DateTime Creation_Date { get; set; } = DateTime.Now;

    public string Id_Sender { get; set; } = string.Empty;
    public User Sender { get; set; } = null!;

    public string Id_Recipient { get; set; } = string.Empty;

  }
}