using Data;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Services;

public class CommentService
{
    private readonly DatabaseContext _context;

    public CommentService(DatabaseContext context)
    {
        _context = context;

    }

    public async Task<ProfileComment> GetProfileCommentById(string id)
    {
        var comment = await _context.ProfileComments.FirstOrDefaultAsync(c => c.Id == id) ?? throw new Exception("Comment not found");
        return comment;
    }

    public async Task<ProfileComment> CreateProfileComment(string comment, string recipientId, User sender)
    {
        var recipient = await _context.Users.FirstOrDefaultAsync(u => u.Id == recipientId) ?? throw new Exception("Recipient not found");
        var profileComment = new ProfileComment
        {
            Id = Guid.NewGuid().ToString(),
            Comment = comment,
            Creation_Date = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, DateTime.Now.Hour,
                DateTime.Now.Minute, DateTime.Now.Second, DateTimeKind.Utc),
            Id_Recipient = recipientId,
            Id_Sender = sender.Id,
            Sender = sender
        };
        await _context.ProfileComments.AddAsync(profileComment);
        await _context.SaveChangesAsync();
        return profileComment;
    }

    public async Task<bool> DeleteProfileComment(string id, List<string> roles, string userId)
    {
        var comment = await _context.ProfileComments.FirstOrDefaultAsync(c => c.Id == id) ?? throw new Exception("Comment not found");
        if (roles.Contains("Admin") || comment.Id_Sender == userId || comment.Id_Recipient == userId)
        {
            _context.ProfileComments.Remove(comment);
            await _context.SaveChangesAsync();
            return true;
        }

        return false;
    }

    public async Task<SongComment> GetSongCommentById(string id)
    {
        var comment = await _context.SongComments.FirstOrDefaultAsync(c => c.Id == id) ?? throw new Exception("Comment not found");
        return comment;
    }

    public async Task<bool> CreateSongComment(string comment, string songId, User sender)
    {
        var song = await _context.Songs.FirstOrDefaultAsync(u => u.Id == songId) ?? throw new Exception("Song not found");
        var songComment = new SongComment
        {
            Id = Guid.NewGuid().ToString(),
            Content = comment,
            Creation_Date = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, DateTime.Now.Hour,
                DateTime.Now.Minute, DateTime.Now.Second, DateTimeKind.Utc),
            Id_Sender = sender.Id,
            Sender = sender,
            Id_Song_Internal = songId,
            Song = song
        };
        await _context.SongComments.AddAsync(songComment);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteSongComment(string id, List<string> roles, string userId)
    {
        var comment = await _context.SongComments.FirstOrDefaultAsync(c => c.Id == id) ?? throw new Exception("Comment not found");
        if (roles.Contains("Admin") || comment.Id_Sender == userId)
        {
            _context.SongComments.Remove(comment);
            await _context.SaveChangesAsync();
            return true;
        }

        return false;
    }

    public async Task<AlbumComment> GetAlbumCommentById(string id)
    {
        var comment = await _context.AlbumComments.FirstOrDefaultAsync(c => c.Id == id) ?? throw new Exception("Comment not found");
        return comment;
    }

    public async Task<bool> CreateAlbumComment(string comment, string albumId, User sender)
    {
        var album = await _context.Albums.FirstOrDefaultAsync(u => u.Id == albumId) ?? throw new Exception("Album not found");
        var albumComment = new AlbumComment
        {
            Id = Guid.NewGuid().ToString(),
            Content = comment,
            Creation_Date = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, DateTime.Now.Hour,
                DateTime.Now.Minute, DateTime.Now.Second, DateTimeKind.Utc),
            Id_User = sender.Id,
            User = sender,
            Id_Album_Internal = albumId,
            Album = album
        };
        await _context.AlbumComments.AddAsync(albumComment);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAlbumComment(string id, List<string> roles, string userId)
    {
        var comment = await _context.AlbumComments.FirstOrDefaultAsync(c => c.Id == id) ?? throw new Exception("Comment not found");
        if (roles.Contains("Admin") || comment.Id_User == userId)
        {
            _context.AlbumComments.Remove(comment);
            await _context.SaveChangesAsync();
            return true;
        }

        return false;
    }

    public async Task<ArtistComment> GetArtistCommentById(string id)
    {
        var comment = await _context.ArtistComments.FirstOrDefaultAsync(c => c.Id == id) ?? throw new Exception("Comment not found");
        return comment;
    }

    public async Task<bool> CreateArtistComment(string comment, string artistId, User sender)
    {
        var artist = await _context.Artists.FirstOrDefaultAsync(u => u.Id == artistId) ?? throw new Exception("Artist not found");
        var artistComment = new ArtistComment
        {
            Id = Guid.NewGuid().ToString(),
            Content = comment,
            Creation_Date = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, DateTime.Now.Hour,
                DateTime.Now.Minute, DateTime.Now.Second, DateTimeKind.Utc),
            Id_User = sender.Id,
            User = sender,
            Id_Artist_Internal = artistId,
            Artist = artist
        };
        await _context.ArtistComments.AddAsync(artistComment);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteArtistComment(string id, List<string> roles, string userId)
    {
        var comment = await _context.ArtistComments.FirstOrDefaultAsync(c => c.Id == id) ?? throw new Exception("Comment not found");
        if (roles.Contains("Admin") || comment.Id_User == userId)
        {
            _context.ArtistComments.Remove(comment);
            await _context.SaveChangesAsync();
            return true;
        }

        return false;
    }
}