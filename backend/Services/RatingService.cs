using Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Models;
using DTOs;

namespace Services;

public class RatingService
{
    private readonly DatabaseContext _context;

    public RatingService(DatabaseContext context)
    {
        _context = context;
     
    }

    public async Task<List<RatedSong>> FetchNRatedUsersSongs(string userId, int n)
    {
        var data = await _context.SongRatings
            .Where(s => s.Id_User == userId)
            .OrderByDescending(s => s.Rating)
            .Take(n)
            .Select(sr => new RatedSong
            {
                Song = sr.Song,
                Rating = sr.Rating
            })
            .ToListAsync();
        return data;
    }

    public async Task<List<RatedAlbum>> FetchNRatedUsersAlbums(string userId, int n)
    {
        var data = await _context.AlbumRatings
            .Where(s => s.Id_User == userId)
            .OrderByDescending(s => s.Rating)
            .Take(n)
            .Select(sr => new RatedAlbum
            {
                Album = sr.Album,
                Rating = sr.Rating
            })
            .ToListAsync();
        return data;
    }

    public async Task<List<RatedArtist>> FetchNRatedUsersArtists(string userId, int n)
    {
        var data = await _context.ArtistRatings
            .Where(s => s.Id_User == userId)
            .OrderByDescending(s => s.Rating)
            .Take(n)
            .Select(sr => new RatedArtist
            {
                Artist = sr.Artist,
                Rating = sr.Rating
            })
            .ToListAsync();
        return data;
    }
    public async Task<List<AverageRatedSong>> FetchNRatedSongs(int n)
    {
        var data = await _context.SongRatings
            .GroupBy(s => s.Song)
            .Select(group => new AverageRatedSong
            {
                Song = group.Key, 
                Rating = group.Average(sr => sr.Rating)
            })
            .Take(n)
            .ToListAsync();
        return data;
    }

    public async Task<List<AverageRatedAlbum>> FetchNRatedAlbums(int n)
    {
        var data = await _context.AlbumRatings
            .GroupBy(s => s.Album)
            .Select(group => new AverageRatedAlbum
            {
                Album = group.Key, 
                Rating = group.Average(sr => sr.Rating)
            })
            .Take(n)
            .ToListAsync();
        return data;
    }

    public async Task<List<AverageRatedArtist>> FetchNRatedArtists(int n)
    {
        var data = await _context.ArtistRatings
            .GroupBy(s => s.Artist)
            .Select(group => new AverageRatedArtist
            {
                Artist = group.Key, 
                Rating = group.Average(sr => sr.Rating)
            })
            .Take(n)
            .ToListAsync();
        return data;
    }

    public async Task<bool> CreateRatingForSong(string songId, int rating, string userId)
    {
        if(rating <= 0) return false;

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        var song = await _context.Songs.FirstOrDefaultAsync(s => s.Id == songId);
        var checkIfExists = await _context.SongRatings.FirstOrDefaultAsync(s => s.User == user && s.Song == song);
        
        if(song != null && checkIfExists == null)
        {
            var songRating = new SongRating{
                Id = Guid.NewGuid().ToString(),
                Rating = rating,
                Id_User = userId,
                Id_Song_Internal = songId,
                Song = song,
                User = user!
            };

            await _context.SongRatings.AddAsync(songRating);
            await _context.SaveChangesAsync();
            return true;
        }

        return false;
    }
}