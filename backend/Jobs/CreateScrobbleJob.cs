using Microsoft.EntityFrameworkCore.Storage;
using Quartz;
using Services;
using Data;
using Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

namespace Jobs;

public class CreateScrobbleJob : IJob
{
    private readonly ScrobbleService _scrobbleService;
    private readonly SpotifyService _spotifyService;
    private readonly DatabaseContext _context;

    public CreateScrobbleJob(ScrobbleService scrobbleService, DatabaseContext context, SpotifyService spotifyService)
    {
        _scrobbleService = scrobbleService;
        _spotifyService = spotifyService;
        _context = context;
    }

    public async Task Execute(IJobExecutionContext context)
    {
        //get all users that have RefreshToken
        List<User> users = await _context.Users
            .Where(u => u.RefreshToken != string.Empty)
            .Where(u => u.Id_User_Spotify_API != string.Empty)
            .ToListAsync();

        foreach (User user in users)
        {
            //get access token
            var access_token = await _spotifyService.GetUserAccessToken(user, user.RefreshToken);
            
            //get last scrobble
            var lastScrobble = await _scrobbleService.GetRecent(user.Id, 1);
            
            //get time of last scrobble in unix
            DateTime lastScrobbleTime;
            long lastScrobbleTimeUnix = 0;
            if(lastScrobble.Count == 0)
            {
                lastScrobbleTime = user.Creation_Date;
                lastScrobbleTimeUnix = new DateTimeOffset(lastScrobbleTime).ToUnixTimeSeconds();
            }
            else
            {
                lastScrobbleTime = lastScrobble[0].Scrobble_Date;
                lastScrobbleTimeUnix = new DateTimeOffset(lastScrobbleTime).ToUnixTimeSeconds();
            }

            //get scrobbles from spotify
            var recentlyPlayed = await _spotifyService.GetRecentlyPlayed(access_token, lastScrobbleTimeUnix);

            int count = 0;
            while(recentlyPlayed["next"]!.ToString() != string.Empty)
            {
                foreach (var item in recentlyPlayed["items"]!)
                {
                    //get track id
                    var trackId = item["track"]["id"].ToString()!;
                    //get track artist
                    var trackArtistId = item["track"]["artists"][0]["id"].ToString()!;
                    //get track album
                    var trackAlbumId = item["track"]["album"]["id"].ToString()!;
                    //get track date
                    var trackDate = item["played_at"].ToString();
                    var trackDateUniversal = DateTime.Parse(trackDate);
                    var trackDateUtc = new DateTime(
                        trackDateUniversal.Year, 
                        trackDateUniversal.Month, 
                        trackDateUniversal.Day, 
                        trackDateUniversal.Hour, 
                        trackDateUniversal.Minute, 
                        trackDateUniversal.Second, 
                        DateTimeKind.Utc
                    );
                    
                    //create scrobble
                    var check = await _scrobbleService.CreateScrobble(user.Id, trackId, trackAlbumId, trackArtistId, trackDateUtc);
                    if (check)
                        count++;
                }
                
                recentlyPlayed = await _spotifyService.GetRecentlyPlayed(access_token, recentlyPlayed["cursors"]!["after"]!.ToObject<long>());
            }
            // Console.WriteLine("Scrobbles created: " + count);
        }
            
    }
}
