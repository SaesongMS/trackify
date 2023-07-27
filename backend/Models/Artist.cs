using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Models
{
    [Table("artists")]
    public class Artist
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Id_Artist_Spotify_API { get; set; } = string.Empty;
        public byte[] Photo { get; set; } = new byte[0];
        public string Description { get; set; } = string.Empty;

        public ICollection<Album> Albums { get; set; } = new List<Album>();
    }

    [Table("artistsRating")]
    public class ArtistRating
    {
        public string Id { get; set; } = string.Empty;
        public int Rating { get; set; } = 0;
        
        public string Id_User { get; set; } = string.Empty;
        public User User { get; set; } = null!;
        
        public string Id_Artist_Internal { get; set; } = string.Empty;
        public Artist Artist { get; set; } = null!;
    }

    [Table("artistsComment")]
    public class ArtistComment
    {
        public string Id { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime Creation_Date { get; set; } = DateTime.Now;
        
        public string Id_User { get; set; } = string.Empty;
        public User User { get; set; } = null!;
        
        public string Id_Artist_Internal { get; set; } = string.Empty;
        public Artist Artist { get; set; } = null!;
    }
}