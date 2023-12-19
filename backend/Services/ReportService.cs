using Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Models;
using DTOs;
using System.Drawing;
using System.Diagnostics;

namespace Services;

public class ReportService
{
    private readonly DatabaseContext _context;

    public ReportService(DatabaseContext context, SpotifyService spotifyService)
    {
        _context = context;
    }

    public async Task<SubjectCountResponse> GetSubjectsCount(DateTime startDate, DateTime endDate, string userId)
    {
        var songCount = await _context.Scrobbles
            .Where(s => s.Id_User == userId && s.Scrobble_Date >= startDate && s.Scrobble_Date <= endDate)
            .Select(s => s.Id_Song_Internal)
            .Distinct()
            .CountAsync();

        var albumCount = await _context.Scrobbles
            .Where(s => s.Id_User == userId && s.Scrobble_Date >= startDate && s.Scrobble_Date <= endDate)
            .Select(s => s.Song.Id_Album_Internal)
            .Distinct()
            .CountAsync();

        var artistCount = await _context.Scrobbles
            .Where(s => s.Id_User == userId && s.Scrobble_Date >= startDate && s.Scrobble_Date <= endDate)
            .Select(s => s.Song.Album.Id_Artist_Internal)
            .Distinct()
            .CountAsync();

        return new SubjectCountResponse
        {
            Success = true,
            Message = "Successfully retrieved subjects count",
            SongCount = songCount,
            AlbumCount = albumCount,
            ArtistCount = artistCount
        };
    }

    public async Task<InfoResponse> GetInfo(DateTime start, DateTime end, string userId)
    {
        var scrobbles = await _context.Scrobbles
            .Where(s => s.Id_User == userId && s.Scrobble_Date >= start && s.Scrobble_Date <= end)
            .ToListAsync();

        var totalScrobbles = scrobbles.Count;
        var averageScrobblesPerDay = (int)Math.Round(totalScrobbles / (end - start).TotalDays);

        var mostActiveHour = scrobbles
            .GroupBy(s => s.Scrobble_Date.Hour)
            .OrderByDescending(g => g.Count())
            .Select(g => g.Key)
            .FirstOrDefault();

        return new InfoResponse
        {
            Success = true,
            Message = "Successfully retrieved info",
            TotalScrobbles = totalScrobbles,
            AverageScrobblesPerDay = averageScrobblesPerDay,
            MostActiveHour = new TimeOnly(mostActiveHour, 0, 0)
        };
    }

    public async Task<TopUsersResponse> GetTopUsers(DateTime start, DateTime end, string userId, int limit)
    {
        var following = await _context.Follows
            .Where(f => f.Id_Follower == userId)
            .Select(f => f.Id_Followed)
            .ToListAsync();

        //get top {limit} users that user and his following are most listening to
        var topUsers = await _context.Scrobbles
            .Where(s => s.Scrobble_Date >= start && s.Scrobble_Date <= end && (s.Id_User == userId || following.Contains(s.Id_User)))
            .GroupBy(s => s.Id_User)
            .OrderByDescending(g => g.Count())
            .Select(g => new TopUsers
            {
                User = g.First().User,
                ScrobbleCount = g.Count()
            })
            .Take(limit)
            .ToListAsync();

        return new TopUsersResponse
        {
            Success = true,
            Message = "Successfully retrieved top users",
            TopUsers = topUsers
        };
    }

}