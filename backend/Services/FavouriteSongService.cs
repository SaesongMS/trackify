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

    public async Task<FavouriteSong?> AddFavouriteSong(string songId, User user)
    {
        //song doesn't exist -> return false
        var song = await _context.Songs.FirstOrDefaultAsync(s => s.Id == songId);
        if (song == null) return null;
        //song already in favourites for this user -> return false
        if (await _context.FavouriteSongs.FirstOrDefaultAsync(fs => fs.Id_Song_Internal == songId && fs.Id_User == user.Id) != null) return null;
        //else add song to favourites:
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
        return favouriteSong;
    }

    public async Task<FavouriteSong?> DeleteFavouriteSong(string songId, User user)
    {
        var song = await _context.Songs.FirstOrDefaultAsync(s => s.Id == songId);
        if (song == null) return null;
        var favouriteSong = await _context.FavouriteSongs.FirstOrDefaultAsync(fs => fs.Id_Song_Internal == songId && fs.Id_User == user.Id);
        if (favouriteSong == null) return null;
        _context.FavouriteSongs.Remove(favouriteSong);
        await _context.SaveChangesAsync();
        return favouriteSong;
    }

    public async Task<List<FavouriteSong>> GetMostLikedSongs(int count)
    {
        return await _context.FavouriteSongs
            .Include(fs => fs.Song)
            .ThenInclude(s => s.Album)
            .ThenInclude(a => a.Artist)
            .Include(fs => fs.User)
            .OrderByDescending(fs => fs.User.Followers.Count)
            .Take(count)
            .ToListAsync();
    }
}