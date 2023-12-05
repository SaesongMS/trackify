using Data;
using System;
using DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.OpenApi.Any;
using Models;
using System.Diagnostics;


namespace Services;

public class UserService
{
    private readonly DatabaseContext _context;

    public UserService(DatabaseContext context)
    {
        _context = context;
    }

    public async Task<ProfileResponse> FetchProfileData(string username)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == username);
        if (user != null)
        {
            var followers = await _context.Follows.Where(f => f.Id_Followed == user.Id).Include(f => f.Follower).Select(f => new Follows
            {
                Id = f.Id,
                Id_Follower = f.Id_Follower,
                Id_Followed = f.Id_Followed,
                Follower = new FollowerData
                {
                    Id = f.Follower.Id,
                    UserName = f.Follower.UserName!,
                    ProfilePicture = f.Follower.Avatar,
                    Bio = f.Follower.Bio
                }
            }).ToListAsync();
            var following = await _context.Follows.Where(f => f.Id_Follower == user.Id).Include(f => f.Followed).Select(f => new Follows
            {
                Id = f.Id,
                Id_Follower = f.Id_Follower,
                Id_Followed = f.Id_Followed,
                Followed = new FollowerData
                {
                    Id = f.Followed.Id,
                    UserName = f.Followed.UserName!,
                    ProfilePicture = f.Followed.Avatar,
                    Bio = f.Followed.Bio
                }
            }).ToListAsync();
            var profileComments = await _context.ProfileComments.Where(pc => pc.Id_Recipient == user.Id).OrderByDescending(pc => pc.Creation_Date).Include(s => s.Sender).Select(pc => new ProfileComments
            {
                Id = pc.Id,
                Comment = pc.Comment,
                Creation_Date = pc.Creation_Date,
                Id_Sender = pc.Id_Sender,
                Sender = new Sender
                {
                    Id = pc.Sender.Id,
                    UserName = pc.Sender.UserName,
                    ProfilePicture = pc.Sender.Avatar
                },
                Id_Recipient = pc.Id_Recipient,
            }).ToListAsync();
            var last10scrobbles = await _context.Scrobbles
                .Where(s => s.Id_User == user.Id).
                OrderByDescending(s => s.Scrobble_Date)
                .Include(a => a.Song.Album.Artist)
                .Include(s => s.Song.FavouriteSongs)
                .Include(s => s.Song.SongRatings)
                .Select(s => new Scrobbles
                {
                    Id = s.Id,
                    Scrobble_Date = s.Scrobble_Date,
                    Id_User = s.Id_User,
                    Id_Song_Internal = s.Id_Song_Internal,
                    Song = s.Song,
                    AvgRating = s.Song.SongRatings.Count > 0 ? s.Song.SongRatings.Average(sr => sr.Rating) : 0
                })
                .Take(10)
                .ToListAsync();
            var scrobblesCount = await _context.Scrobbles.Where(s => s.Id_User == user.Id).CountAsync();
            var ratedSongs = await _context.SongRatings.Where(sr => sr.Id_User == user.Id).OrderByDescending(sr => sr.Rating).Select(sr => new RatedSongs
            {
                Id_Song = sr.Song.Id,
                Rating = sr.Rating,
                Id_Song_Internal = sr.Id_Song_Internal,
                Song = sr.Song
            }).ToListAsync();
            var ratedAlbums = await _context.AlbumRatings.Where(ar => ar.Id_User == user.Id).OrderByDescending(ar => ar.Rating).Select(ar => new RatedAlbums
            {
                Id_Album = ar.Album.Id,
                Rating = ar.Rating,
                Id_Album_Internal = ar.Id_Album_Internal,
                Album = ar.Album
            }).ToListAsync();
            var ratedArtist = await _context.ArtistRatings.Where(ar => ar.Id_User == user.Id).OrderByDescending(ar => ar.Rating).Select(ar => new RatedArtists
            {
                Id_Artist = ar.Artist.Id,
                Rating = ar.Rating,
                Id_Artist_Internal = ar.Id_Artist_Internal,
                Artist = ar.Artist
            }).ToListAsync();
            var favouriteSongs = await _context.FavouriteSongs.Where(fs => fs.Id_User == user.Id).Include(a => a.Song).ThenInclude(a => a.Album).ThenInclude(a => a.Artist).Select(fs => new FavouriteSongs
            {
                Id_Song = fs.Song.Id,
                Id_Song_Internal = fs.Id_Song_Internal,
                Song = fs.Song
            }).ToListAsync();
            var artistCount = await _context.Scrobbles.Where(s => s.Id_User == user.Id).Select(s => s.Song.Album.Artist).Distinct().CountAsync();
            var topArtist = await _context.Scrobbles.Where(s => s.Id_User == user.Id).GroupBy(s => s.Song.Album.Artist).OrderByDescending(s => s.Count()).Select(s => s.Key).FirstOrDefaultAsync();
            var userData = new ProfileResponse
            {
                Id = user.Id,
                UserName = user.UserName,
                ProfilePicture = user.Avatar,
                Description = user.Bio,
                ArtistCount = artistCount,
                Followers = followers,
                Following = following,
                ProfileComments = profileComments,
                Scrobbles = last10scrobbles,
                ScrobblesCount = scrobblesCount,
                RatedSongs = ratedSongs,
                RatedAlbums = ratedAlbums,
                RatedArtists = ratedArtist,
                FavouriteSongs = favouriteSongs,
                Creation_Date = user.Creation_Date,
                TopArtistImage = topArtist != null ? topArtist.Photo : null,
                RefreshToken = user.RefreshToken
            };
            return userData;
        }
        return null;
    }


    public async Task<int> EditProfileData(string username, string Bio, string Avatar, string userId, List<string> roles)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == username);

        if (user == null) return 404;
        else if (roles.Contains("Admin") || user.Id == userId)
        {
            user.Bio = Bio;

            if (!string.IsNullOrEmpty(Avatar))
            {
                Avatar = CleanBase64String(Avatar);
                user.Avatar = Convert.FromBase64String(Avatar);
            }

            try
            {
                await _context.SaveChangesAsync();
                return 200;
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine($"Error updating database: {ex}");
                return 400;
            }
        }
        else return 403;
    }

    public async Task<string> GetIdByUserName(string username)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == username);
        if (user != null)
        {
            return user.Id;
        }
        return null!;
    }

    public async Task<List<UserProfile>> SearchUsers(string query)
    {
        //contains query ignores case
        var users = await _context.Users.Where(u => u.UserName.ToLower().Contains(query)).Select(u => new UserProfile
        {
            Id = u.Id,
            UserName = u.UserName,
            ProfilePicture = u.Avatar

        }).ToListAsync();

        if (users != null)
            return users;
        return null!;
    }

    private string CleanBase64String(string base64String)
    {
        return base64String[(base64String.IndexOf(',') + 1)..];
    }
    public async Task<bool> ConnectSpotify(string token, string spotifyId, string userId)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        if (user != null)
        {
            user.Id_User_Spotify_API = spotifyId;
            user.RefreshToken = token;
            await _context.SaveChangesAsync();
            return true;
        }
        return false;

    }

    public async Task<bool> DisconnectSpotify(string userId)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        if (user != null)
        {
            user.Id_User_Spotify_API = string.Empty;
            user.RefreshToken = string.Empty;
            await _context.SaveChangesAsync();
            return true;
        }
        return false;
    }

    public async Task<List<MostActiveUsers>> FetchMostActiveUsers()
    {
        var users = await _context.Users
            .OrderByDescending(u => u.Scrobbles.Count)
            .Take(10)
            .Select(u => new MostActiveUsers
            {
                Id = u.Id,
                UserName = u.UserName,
                ProfilePicture = u.Avatar,
                ScrobbleCount = u.Scrobbles.Count
            }).ToListAsync();

        if (users != null)
            return users;
        return null!;
    }

    public async Task<(float,List<string>)> Compability(string userId, string senderId)
    {
        //calculate compability between two users by comparing artist in their scrobbles
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        var sender = await _context.Users.FirstOrDefaultAsync(u => u.Id == senderId);

        if (user != null && sender != null)
        {
            var userScrobbles = await _context.Scrobbles.Where(s => s.Id_User == user.Id).Include(s => s.Song).ThenInclude(s => s.Album).ThenInclude(s => s.Artist).ToListAsync();
            var senderScrobbles = await _context.Scrobbles.Where(s => s.Id_User == sender.Id).Include(s => s.Song).ThenInclude(s => s.Album).ThenInclude(s => s.Artist).ToListAsync();

            var userArtists = userScrobbles.Select(s => s.Song.Album.Artist).Distinct().ToList();
            var senderArtists = senderScrobbles.Select(s => s.Song.Album.Artist).Distinct().ToList();

            var commonArtists = userArtists.Intersect(senderArtists).ToList();

            var compability = (float)commonArtists.Count / (float)Math.Max(userArtists.Count, senderArtists.Count);

            //get top 3 common artists names
            var topArtists = commonArtists.Take(3).ToList();
            var topArtistsNames = topArtists.Select(a => a.Name).ToList();

            return (compability, topArtistsNames);
        }

        return (-1f,new List<string>());
    }

}