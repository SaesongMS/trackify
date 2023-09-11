using Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Models;


namespace Services;

public class ScrobbleService
{
    private readonly DatabaseContext _context;
    private readonly SpotifyService _spotifyService;

    public ScrobbleService(DatabaseContext context, SpotifyService spotifyService)
    {
        _context = context;
        _spotifyService = spotifyService;
    }

    public async Task<List<Scrobble>> GetRecent(string userId, int n)
    {
        var scrobbles = await _context.Scrobbles
            .Where(s => s.Id_User == userId)
            .OrderByDescending(s => s.Scrobble_Date)
            .Take(n)
            .ToListAsync();
        
        return scrobbles;
    }

    public async Task<List<Scrobble>> GetScrobblesInInterval(string userId, DateTime start, DateTime end)
    {
        // //create a new start with utc timezone
        // start = new DateTime(start.Year, start.Month, start.Day, start.Hour, start.Minute, start.Second, DateTimeKind.Utc);
        // //create a new end with utc timezone
        // end = new DateTime(end.Year, end.Month, end.Day, end.Hour, end.Minute, end.Second, DateTimeKind.Utc);

        //u can either use above code or set the timezone in the request, for example: 1999-01-08T04:05:06Z
        
        var scrobbles = await _context.Scrobbles
            .Where(s => s.Id_User == userId && s.Scrobble_Date >= start && s.Scrobble_Date <= end)
            .OrderByDescending(s => s.Scrobble_Date)
            .ToListAsync();
        
        return scrobbles;
    }

    public async Task<List<Scrobble>> GetTopArtistsScrobble(string userId, int n, DateTime start, DateTime end)
    {
        //count the number of scrobbles per artist and order them descending, then take the first n
        var scrobbles = await _context.Scrobbles
            .Where(s => s.Id_User == userId && s.Scrobble_Date >= start && s.Scrobble_Date <= end)
            .GroupBy(s => s.Song.Album.Artist)
            .Select(s => new
            {
                Artist = s.Key,
                Count = s.Count()
            })
            .OrderByDescending(s => s.Count)
            .Take(n)
            .ToListAsync();
        Console.WriteLine("scrobbles.Count: " + scrobbles.Count);
        foreach (var scrobble in scrobbles)
        {
            Console.WriteLine(scrobble.Artist.Name);
        }


        return null;
    }

    public async Task<List<Scrobble>> GetTopAlbumScrobble(string userId, int n, DateTime start, DateTime end)
    {
        //count the number of scrobbles per artist and order them descending, then take the first n
        var scrobbles = await _context.Scrobbles
            .Where(s => s.Id_User == userId && s.Scrobble_Date >= start && s.Scrobble_Date <= end)
            .GroupBy(s => s.Song.Album)
            .Select(s => new
            {
                Album = s.Key,
                Count = s.Count()
            })
            .OrderByDescending(s => s.Count)
            .Take(n)
            .ToListAsync();
        Console.WriteLine("scrobbles.Count: " + scrobbles.Count);
        foreach (var scrobble in scrobbles)
        {
            Console.WriteLine(scrobble.Album.Name);
        }


        return null;
    }

    public async Task<List<Scrobble>> GetTopSongScrobble(string userId, int n, DateTime start, DateTime end)
    {
        //count the number of scrobbles per artist and order them descending, then take the first n
        var scrobbles = await _context.Scrobbles
            .Where(s => s.Id_User == userId && s.Scrobble_Date >= start && s.Scrobble_Date <= end)
            .GroupBy(s => s.Song)
            .Select(s => new
            {
                Song = s.Key,
                Count = s.Count()
            })
            .OrderByDescending(s => s.Count)
            .Take(n)
            .ToListAsync();
        Console.WriteLine("scrobbles.Count: " + scrobbles.Count);
        foreach (var scrobble in scrobbles)
        {
            Console.WriteLine(scrobble.Song.Title);
        }


        return null;
    }

    public async Task<bool> CreateScrobble(string userId, string spotify_songId, string spotify_albumId, string spotify_artistId)
    {
        var song = await _context.Songs.FirstOrDefaultAsync(s => s.Id_Song_Spotify_API == spotify_songId) 
            ?? await CreateSong(spotify_songId, spotify_albumId, spotify_artistId);
        if (song != null)
        {
            var date = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, DateTime.Now.Hour,
                DateTime.Now.Minute, DateTime.Now.Second, DateTimeKind.Utc);
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            var scrobble = new Scrobble
            {
                Id = Guid.NewGuid().ToString(),
                Scrobble_Date = date,
                Id_User = userId,
                User = user!,
                Id_Song_Internal = song.Id,
                Song = song
            };
            await _context.Scrobbles.AddAsync(scrobble);
            await _context.SaveChangesAsync();
            return true;
        }


        return false;
    }

    public async Task<Song> CreateSong(string spotify_songId, string spotify_albumId, string spotify_artistId)
    {
        var album = await _context.Albums.FirstOrDefaultAsync(a => a.Id_Album_Spotify_API == spotify_albumId) 
            ?? await CreateAlbum(spotify_albumId, spotify_artistId);
        if (album != null)
        {
            // await _spotifyService.GetAccesToken();
            var song = await _spotifyService.GetSong(spotify_songId, album);
            if (song != null)
            {
                await _context.Songs.AddAsync(song);
                await _context.SaveChangesAsync();
                return song;
            }
        }

        return null;
    }

    public async Task<Album> CreateAlbum(string spotify_albumId, string spotify_artistId)
    {
        var artist = await _context.Artists.FirstOrDefaultAsync(a => a.Id_Artist_Spotify_API == spotify_artistId) 
            ?? await CreateArtist(spotify_artistId);
        if (artist != null)
        {
            // await _spotifyService.GetAccesToken();
            var album = await _spotifyService.GetAlbum(spotify_albumId, artist);
            if (album != null)
            {
                await _context.Albums.AddAsync(album);
                await _context.SaveChangesAsync();
                return album;
            }
        }

        return null;
    }

    public async Task<Artist> CreateArtist(string spotify_artistId)
    {
        // await _spotifyService.GetAccesToken();
        var artist = await _spotifyService.GetArtist(spotify_artistId);
        if (artist != null)
        {
            await _context.Artists.AddAsync(artist);
            await _context.SaveChangesAsync();
            return artist;
        }
        
        return null;
    }

    public async Task<bool> DeleteScrobble(string id, string userId, List<string> roles)
    {
        var scrobble = await _context.Scrobbles.FirstOrDefaultAsync(s => s.Id == id);
        if (scrobble != null)
        {
            Console.WriteLine(roles.Contains("Admin") || scrobble.Id_User == userId);
            Console.WriteLine("scrobble.Id_User: " + scrobble.Id_User);
            Console.WriteLine("userId: " + userId);
            if(roles.Contains("Admin") || scrobble.Id_User == userId)
            {
                _context.Scrobbles.Remove(scrobble);
                await _context.SaveChangesAsync();
                return true;
            }
        }

        return false;
    }
}
