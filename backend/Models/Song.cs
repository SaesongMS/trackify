using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Models
{
    [Table("songs")]
    public class Song
    {
        public string Id { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Id_Song_Spotify_API { get; set; } = string.Empty;
        
        public string Id_Album_Internal { get; set; } = string.Empty;
        public Album Album { get; set; } = null!;

        public ICollection<FavouriteSong> FavouriteSongs { get; set; } = new List<FavouriteSong>();
        public ICollection<SongComment> SongComments { get; set; } = new List<SongComment>();
        public ICollection<SongRating> SongRatings { get; set; } = new List<SongRating>();
    
        public ICollection<Scrobble> Scrobbles { get; set; } = new List<Scrobble>();
    }

    [Table("favouriteSongs")]
    public class FavouriteSong
    {
        public string Id { get; set; } = string.Empty;
        
        public string Id_User { get; set; } = string.Empty;
        public User User { get; set; } = null!;
        
        public string Id_Song_Internal { get; set; } = string.Empty;
        public Song Song { get; set; } = null!;
    }

    [Table("songsComments")]
    public class SongComment
    {
        public string Id { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime Creation_Date { get; set; } = DateTime.Now;
        
        public string Id_Sender { get; set; } = string.Empty;
        public User Sender { get; set; } = null!;
        
        public string Id_Song_Internal { get; set; } = string.Empty;
        public Song Song { get; set; } = null!;
    }

    [Table("songsRating")]
    public class SongRating
    {
        public string Id { get; set; } = string.Empty;
        public int Rating { get; set; } = 0;
        
        public string Id_User { get; set; } = string.Empty;
        public User User { get; set; } = null!;
        
        public string Id_Song_Internal { get; set; } = string.Empty;
        public Song Song { get; set; } = null!;
    }
}