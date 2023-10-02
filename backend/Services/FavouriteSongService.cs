using Data;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Services;

public class FavouriteSongService
{
    private readonly DatabaseContext _context;

    public FavouriteSongService(DatabaseContext context)
    {
        _context = context;

    }

    public async Task<bool> AddFavouriteSong(string songId, User user)
    {
        var song = await _context.Songs.FirstOrDefaultAsync(s => s.Id == songId);
        if (song == null) return false;
        var favouriteSong = new FavouriteSong
        {
            Id = Guid.NewGuid().ToString(),
            Id_Song_Internal = songId,
            Id_User = user.Id,
            User = user,
            Song = song
        };
        await _context.FavouriteSongs.AddAsync(favouriteSong);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteFavouriteSong(string songId, User user)
    {
        var song = await _context.Songs.FirstOrDefaultAsync(s => s.Id == songId);
        if (song == null) return false;
        var favouriteSong = await _context.FavouriteSongs.FirstOrDefaultAsync(fs => fs.Id_Song_Internal == songId && fs.Id_User == user.Id);
        if (favouriteSong == null) return false;
        _context.FavouriteSongs.Remove(favouriteSong);
        await _context.SaveChangesAsync();
        return true;
    }
}