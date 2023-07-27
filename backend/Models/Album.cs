using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Models
{
    [Table("albums")]
    public class Album
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Id_Album_Spotify_API { get; set; } = string.Empty;
        public byte[] Cover { get; set; } = new byte[0];
        public string Description { get; set; } = string.Empty;
        
        public string Id_Artist_Internal { get; set; } = string.Empty;
        public Artist Artist { get; set; } = null!;

        public ICollection<Song> Songs { get; set; } = new List<Song>();
    }

    [Table("albumsRating")]
    public class AlbumRating
    {
        public string Id { get; set; } = string.Empty;
        public int Rating { get; set; } = 0;
        
        public string Id_User { get; set; } = string.Empty;
        public User User { get; set; } = null!;
        
        public string Id_Album_Internal { get; set; } = string.Empty;
        public Album Album { get; set; } = null!;
    }

    [Table("albumsComment")]
    public class AlbumComment
    {
        public string Id { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime Creation_Date { get; set; } = DateTime.Now;
        
        public string Id_User { get; set; } = string.Empty;
        public User User { get; set; } = null!;
        
        public string Id_Album_Internal { get; set; } = string.Empty;
        public Album Album { get; set; } = null!;
    }
}