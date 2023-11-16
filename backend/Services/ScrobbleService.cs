using Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Models;
using DTOs;

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
        var new_end = end.ToUniversalTime();

        var scrobbles = await _context.Scrobbles
            .Where(s => s.Id_User == userId && s.Scrobble_Date >= start && s.Scrobble_Date <= end)
            .OrderByDescending(s => s.Scrobble_Date)
            .Include(s => s.Song)
            .ThenInclude(s => s.Album)
            .ThenInclude(a => a.Artist)
            .ToListAsync();

        return scrobbles;
    }

    public async Task<List<SongScrobbleCount>> FetchTopNSongsScrobbles(string userId, DateTime start, DateTime end)
    {
        var start_date = start.ToUniversalTime();
        var end_date = end.ToUniversalTime();

        var groupings = await _context.Scrobbles
            .Where(s => s.Id_User == userId && s.Scrobble_Date >= start_date && s.Scrobble_Date <= end_date)
            .Include(s => s.Song.Album.Artist)
            .GroupBy(s => s.Song)
            .ToListAsync();

        var data = groupings
            .Select(s => new SongScrobbleCount
            {
                Song = s.Key,
                Count = s.Count()
            })
            .OrderByDescending(s => s.Count)
            .ToList();
        return data;
    }

    public async Task<List<AlbumScrobbleCount>> FetchTopNAlbumsScrobbles(string userId, DateTime start, DateTime end)
    {
        var start_date = start.ToUniversalTime();
        var end_date = end.ToUniversalTime();

        var groupings = await _context.Scrobbles
            .Where(s => s.Id_User == userId && s.Scrobble_Date >= start_date && s.Scrobble_Date <= end_date)
            .Include(s => s.Song.Album.Artist)
            .GroupBy(s => s.Song.Album)
            .ToListAsync();

        var data = groupings
            .Select(s => new AlbumScrobbleCount
            {
                Album = s.Key,
                Count = s.Count()
            })
            .OrderByDescending(s => s.Count)
            .ToList();
        return data;
    }

    public async Task<List<ArtistScrobbleCount>> FetchTopNArtistsScrobbles(string userId, DateTime start, DateTime end)
    {
        var start_date = start.ToUniversalTime();
        var end_date = end.ToUniversalTime();

        var data = await _context.Scrobbles
            .Where(s => s.Id_User == userId && s.Scrobble_Date >= start_date && s.Scrobble_Date <= end_date)
            .GroupBy(s => s.Song.Album.Artist)
            .Select(s => new ArtistScrobbleCount
            {
                Artist = s.Key,
                Count = s.Count()
            })
            .OrderByDescending(s => s.Count)
            .ToListAsync();
        return data;
    }

    public async Task<List<SongScrobbleCount>> FetchTopNSongsScrobbles(string userId, int n)
    {
        var groupings = await _context.Scrobbles
            .Include(s => s.Song.Album.Artist)
            .Where(s => s.Id_User == userId)
            .GroupBy(s => s.Song)
            .ToListAsync();

        var data = groupings
            .Select(s => new SongScrobbleCount
            {
                Song = s.Key,
                Count = s.Count()
            })
            .OrderByDescending(s => s.Count)
            .Take(n)
            .ToList();

        return data;
    }

    public async Task<List<AlbumScrobbleCount>> FetchTopNAlbumsScrobbles(string userId, int n)
    {
        var groupings = await _context.Scrobbles
            .Include(s => s.Song.Album.Artist)
            .Where(s => s.Id_User == userId)
            .GroupBy(s => s.Song.Album)
            .ToListAsync();

        var data = groupings
            .Select(s => new AlbumScrobbleCount
            {
                Album = s.Key,
                Count = s.Count()
            })
            .OrderByDescending(s => s.Count)
            .Take(n)
            .ToList();

        return data;
    }

    public async Task<List<ArtistScrobbleCount>> FetchTopNArtistsScrobbles(string userId, int n)
    {
        var data = await _context.Scrobbles
            .Where(s => s.Id_User == userId)
            .GroupBy(s => s.Song.Album.Artist)
            .Select(s => new ArtistScrobbleCount
            {
                Artist = s.Key,
                Count = s.Count()
            })
            .OrderByDescending(s => s.Count)
            .Take(n)
            .ToListAsync();
        return data;
    }
    public async Task<List<SongScrobbleCount>> FetchTopNSongsScrobbles(int n, DateTime start, DateTime end)
    {
        var data = await _context.Scrobbles
            .Where(s => s.Scrobble_Date >= start && s.Scrobble_Date <= end)
            .GroupBy(s => s.Song)
            .Select(s => new SongScrobbleCount
            {
                Song = s.Key,
                Count = s.Count()
            })
            .OrderByDescending(s => s.Count)
            .Take(n)
            .ToListAsync();
        return data;
    }

    public async Task<List<AlbumScrobbleCount>> FetchTopNAlbumsScrobbles(int n, DateTime start, DateTime end)
    {
        var data = await _context.Scrobbles
            .Where(s => s.Scrobble_Date >= start && s.Scrobble_Date <= end)
            .GroupBy(s => s.Song.Album)
            .Select(s => new AlbumScrobbleCount
            {
                Album = s.Key,
                Count = s.Count()
            })
            .OrderByDescending(s => s.Count)
            .Take(n)
            .ToListAsync();
        return data;
    }

    public async Task<List<ArtistScrobbleCount>> FetchTopNArtistsScrobbles(int n, DateTime start, DateTime end)
    {
        var data = await _context.Scrobbles
            .Where(s => s.Scrobble_Date >= start && s.Scrobble_Date <= end)
            .GroupBy(s => s.Song.Album.Artist)
            .Select(s => new ArtistScrobbleCount
            {
                Artist = s.Key,
                Count = s.Count()
            })
            .OrderByDescending(s => s.Count)
            .Take(n)
            .ToListAsync();
        return data;
    }

    public async Task<List<SongScrobbleCount>> FetchTopNSongsScrobbles(int n)
    {
        var data = await _context.Scrobbles
            .GroupBy(s => s.Song)
            .Select(s => new SongScrobbleCount
            {
                Song = s.Key,
                Count = s.Count()
            })
            .OrderByDescending(s => s.Count)
            .Take(n)
            .ToListAsync();
        return data;
    }

    public async Task<List<AlbumScrobbleCount>> FetchTopNAlbumsScrobbles(int n)
    {
        var data = await _context.Scrobbles
            .GroupBy(s => s.Song.Album)
            .Select(s => new AlbumScrobbleCount
            {
                Album = s.Key,
                Count = s.Count()
            })
            .OrderByDescending(s => s.Count)
            .Take(n)
            .ToListAsync();
        return data;
    }

    public async Task<List<ArtistScrobbleCount>> FetchTopNArtistsScrobbles(int n)
    {
        var data = await _context.Scrobbles
            .GroupBy(s => s.Song.Album.Artist)
            .Select(s => new ArtistScrobbleCount
            {
                Artist = s.Key,
                Count = s.Count()
            })
            .OrderByDescending(s => s.Count)
            .Take(n)
            .ToListAsync();
        return data;
    }
    public async Task<bool> CreateScrobble(string userId, string spotify_songId, string spotify_albumId, string spotify_artistId)
    {
        var song = await _context.Songs.FirstOrDefaultAsync(s => s.Id_Song_Spotify_API == spotify_songId)
            ?? await CreateSong(spotify_songId, spotify_albumId, spotify_artistId);
        if (song != null)
        {
            var date = DateTime.Now.ToUniversalTime();
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
            if (roles.Contains("Admin") || scrobble.Id_User == userId)
            {
                _context.Scrobbles.Remove(scrobble);
                await _context.SaveChangesAsync();
                return true;
            }
        }

        return false;
    }

    public async Task<List<Song>> SearchSongs(string query)
    {
        var songs = await _context.Songs
            .Include(s => s.Album)
            .ThenInclude(a => a.Artist)
            .Where(s => s.Title.ToLower().Contains(query) || s.Album.Name.ToLower().Contains(query) ||
                        s.Album.Artist.Name.ToLower().Contains(query))
            .ToListAsync();
        return songs;
    }

    public async Task<List<Album>> SearchAlbums(string query)
    {
        var albums = await _context.Albums
            .Include(a => a.Artist)
            .Include(a => a.Songs)
            .Where(a => a.Name.ToLower().Contains(query) || a.Songs.Any(s => s.Title.ToLower().Contains(query)))
            .ToListAsync();
        return albums;
    }

    public async Task<List<Artist>> SearchArtists(string query)
    {
        var artists = await _context.Artists
            .Include(a => a.Albums)
            .ThenInclude(a => a.Songs)
            .Where(a => a.Name.ToLower().Contains(query) || a.Albums.Any(a => a.Name.ToLower().Contains(query)) ||
                        a.Albums.Any(a => a.Songs.Any(s => s.Title.ToLower().Contains(query))))
            .ToListAsync();
        return artists;
    }

    public async Task<Song> GetSongByName(string name)
    {

        var song = await _context.Songs
            .Include(s => s.Album)
            .ThenInclude(a => a.Artist)
            .Include(s => s.SongComments)
            .ThenInclude(c => c.Sender)
            .Include(s => s.SongRatings)
            .Include(s => s.FavouriteSongs)
            .ThenInclude(s => s.User)
            .FirstOrDefaultAsync(s => s.Title.ToLower() == name.ToLower());
        return song;
    }

    public async Task<Album> GetAlbumByName(string name)
    {
        var album = await _context.Albums
            .Include(a => a.Artist)
            .Include(a => a.Songs)
            .Include(a => a.AlbumComments)
            .ThenInclude(a => a.Sender)
            .Include(a => a.AlbumRatings)
            .FirstOrDefaultAsync(a => a.Name.ToLower() == name.ToLower());
        return album;
    }

    public async Task<Artist> GetArtistByName(string name)
    {
        var artist = await _context.Artists
            .Include(a => a.Albums)
            .ThenInclude(a => a.Songs)
            .Include(a => a.ArtistComments)
            .ThenInclude(a => a.Sender)
            .Include(a => a.ArtistRatings)
            .FirstOrDefaultAsync(a => a.Name.ToLower() == name.ToLower());
        return artist;
    }

    public async Task<List<SongScrobbleCount>> FetchTopNSongsScrobblesForArtist(int n, DateTime start, DateTime end, string artistId)
    {
        var start_date = start.ToUniversalTime();
        var end_date = end.ToUniversalTime();

        var groupings = await _context.Scrobbles
            .Where(s => s.Scrobble_Date >= start_date && s.Scrobble_Date <= end_date && s.Song.Album.Artist.Id == artistId)
            .Include(s => s.Song.Album.Artist)
            .GroupBy(s => s.Song)
            .ToListAsync();

        var data = groupings
            .Select(s => new SongScrobbleCount
            {
                Song = s.Key,
                Count = s.Count()
            })
            .OrderByDescending(s => s.Count)
            .Take(n)
            .ToList();
        return data;
    }
}
