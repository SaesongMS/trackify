using Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Models;
using DTOs;
using System.Drawing;
using System.Diagnostics;
using System.Globalization;

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

    public async Task<CountByDayResponse> GetCountByDay(DateTime start, DateTime end, string userId)
    {
        var scrobbles = await _context.Scrobbles
            .Where(s => s.Id_User == userId && s.Scrobble_Date >= start && s.Scrobble_Date <= end)
            .ToListAsync();

        var countByDay = scrobbles
            .GroupBy(s => s.Scrobble_Date.Date)
            .Select(g => new CountByDay
            {
                Date = new DateOnly(g.Key.Year, g.Key.Month, g.Key.Day),
                DayOfWeek = g.Key.DayOfWeek.ToString(),
                Count = g.Count()
            })
            .ToList();   

        return new CountByDayResponse
        {
            Success = true,
            Message = "Successfully retrieved count by day",
            CountByDay = countByDay
        };
    }

    public async Task<CountByWeekResponse> GetCountByWeek(DateTime start, DateTime end, string userId)
    {
        var scrobbles = await _context.Scrobbles
            .Where(s => s.Id_User == userId && s.Scrobble_Date >= start && s.Scrobble_Date <= end)
            .ToListAsync();

        //get count by week, starting from monday, to the end of the week of the {end} date
        var countByWeek = scrobbles
            .GroupBy(s => CultureInfo.CurrentCulture.Calendar.GetWeekOfYear(s.Scrobble_Date, CalendarWeekRule.FirstDay, DayOfWeek.Monday))
            .Select(g => new CountByWeek
            {
                StartDate = new DateOnly(g.First().Scrobble_Date.Year, g.First().Scrobble_Date.Month, g.First().Scrobble_Date.Day),
                EndDate = new DateOnly(g.First().Scrobble_Date.Year, g.First().Scrobble_Date.Month, g.First().Scrobble_Date.Day).AddDays(6),
                Count = g.Count()
            })
            .ToList();

        return new CountByWeekResponse
        {
            Success = true,
            Message = "Successfully retrieved count by week",
            CountByWeek = countByWeek
        };
    }

    public async Task<CountByMonthResponse> GetCountByMonth(DateTime start, DateTime end, string userId)
    {
        var scrobbles = await _context.Scrobbles
            .Where(s => s.Id_User == userId && s.Scrobble_Date >= start && s.Scrobble_Date <= end)
            .ToListAsync();

        var countByMonth = scrobbles
            .GroupBy(s => new { s.Scrobble_Date.Month, s.Scrobble_Date.Year })
            .Select(g => new CountByMonth
            {
                Month = g.Key.Month,
                Year = g.Key.Year,
                Count = g.Count()
            })
            .ToList();

        return new CountByMonthResponse
        {
            Success = true,
            Message = "Successfully retrieved count by month",
            CountByMonth = countByMonth
        };
    }


}