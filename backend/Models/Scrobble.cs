using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Models
{
    [Table("scrobbles")]
    public class Scrobble
    {
        public string Id { get; set; } = string.Empty;
        public DateTime Scrobble_Date { get; set; } = DateTime.Now;

        public string Id_User { get; set; } = string.Empty;
        public User User { get; set; } = null!;

        public string Id_Song_Internal { get; set; } = string.Empty;
        public Song Song { get; set; } = null!;
    }
}