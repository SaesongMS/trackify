using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using DTOs;


namespace Controllers;
[ApiController]
[Route("api/scrobbles")]
public class ScrobblesController: ControllerBase
{
    private readonly AuthenticationService _authenticationService;
    private readonly ScrobbleService _scrobbleService;

    public ScrobblesController(AuthenticationService authenticationService, ScrobbleService scrobbleService)
    {
        _authenticationService = authenticationService;
        _scrobbleService = scrobbleService;
    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpGet("recent")]
    public async Task<IActionResult> GetRecentScrobbles([FromBody] RecentScrobblesRequest request)
    {
        var nameIdentifier = User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
        try
        {
            var user = await _authenticationService.GetUser(nameIdentifier);
            var scrobbles = await _scrobbleService.GetRecent(user.Id, request.N);
            return Ok(new RecentScrobblesResponse
            {
                Success = true,
                Scrobbles = scrobbles
            });
        }
        catch (Exception e)
        {
            return BadRequest(new {message = e.Message});
        }
    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpGet("interval")]
    public async Task<IActionResult> GetScrobblesInInterval([FromBody] IntervalScrobblesRequest request)
    {
        var nameIdentifier = User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
        try
        {
            var user = await _authenticationService.GetUser(nameIdentifier);
            var scrobbles = await _scrobbleService.GetScrobblesInInterval(user.Id, request.Start, request.End);
            return Ok(new IntervalScrobblesResponse
            {
                Success = true,
                Scrobbles = scrobbles
            });
        }
        catch (Exception e)
        {
            return BadRequest(new {message = e.Message});
        }
    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpGet("n_interval")]
    public async Task<IActionResult> GetNScrobblesInInterval([FromBody] NIntervalScrobblesRequest request)
    {
        var nameIdentifier = User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
        try
        {
            var user = await _authenticationService.GetUser(nameIdentifier);
            var scrobbles = await _scrobbleService.GetScrobblesInInterval(user.Id, request.Start, request.End);
            return Ok(new NIntervalScrobblesResponse
            {
                Success = true,
                Scrobbles = scrobbles.Take(request.N).ToList()
            });
        }
        catch (Exception e)
        {
            return BadRequest(new {message = e.Message});
        }
    }
    
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    // [Authorize(Roles = "Admin")]
    [HttpPost("create")]
    public async Task<IActionResult> CreateScrobble([FromBody] CreateScrobbleRequest request)
    {
        try
        {
            if(await _scrobbleService.CreateScrobble(request.User_Id, request.Id_Song_Spotify_Api, request.Id_Album_Spotify_Api, request.Id_Artist_Spotify_Api))
                return Ok(new CreateScrobbleResponse
                {
                    Success = true,
                    Message = "Scrobble created successfully"
                });
            return BadRequest(new CreateScrobbleResponse
                {
                    Success = false,
                    Message = "Scrobble creation failed"
                });
        }
        catch (Exception e)
        {
            return BadRequest(new {message = e.Message});
        }
    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpDelete("delete")]
    public async Task<IActionResult> DeleteScrobble([FromBody] DeleteScrobbleRequest request)
    {
        var nameIdentifier = User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
        var roles = User.FindAll("http://schemas.microsoft.com/ws/2008/06/identity/claims/role").Select(r => r.Value).ToList();
        try
        {
            var user = await _authenticationService.GetUser(nameIdentifier);
            if(await _scrobbleService.DeleteScrobble(request.Id, user.Id, roles))
                return Ok(new DeleteScrobbleResponse
                {
                    Success = true,
                    Message = "Scrobble deleted successfully"
                });
            return BadRequest(new DeleteScrobbleResponse
            {
                Success = false,
                Message = "Scrobble deletion failed"
            });
        }
        catch (Exception e)
        {
            return BadRequest(new {message = e.Message});
        }
    }

    [HttpGet("top-songs")]
    public async Task<IActionResult> GetTopUsersSongs([FromBody] NIntervalTopUserScrobblesRequest request)
    {
        try
        {
            List<SongScrobbleCount> topSongs = await _scrobbleService.FetchTopNSongsScrobbles(request.Id, request.N, request.Start, request.End);
            return Ok(new TopNSongsScrobblesResponse
            {
                Success = true,
                TopSongs = topSongs
            });
        }
        catch (Exception e)
        {
            return BadRequest(new {message = e.Message});
        }
    }

    [HttpGet("top-albums")]
    public async Task<IActionResult> GetTopUsersAlbums([FromBody] NIntervalTopUserScrobblesRequest request)
    {
        try
        {
            List<AlbumScrobbleCount> topAlbums = await _scrobbleService.FetchTopNAlbumsScrobbles(request.Id, request.N, request.Start, request.End);
            return Ok(new TopNAlbumsScrobblesResponse
            {
                Success = true,
                TopAlbums = topAlbums
            });
        }
        catch (Exception e)
        {
            return BadRequest(new {message = e.Message});
        }
    }

    [HttpGet("top-artists")]
    public async Task<IActionResult> GetTopUsersArtists([FromBody] NIntervalTopUserScrobblesRequest request)
    {
        try
        {
            List<ArtistScrobbleCount> topArtists = await _scrobbleService.FetchTopNArtistsScrobbles(request.Id, request.N, request.Start, request.End);
            return Ok(new TopNArtistsScrobblesResponse
            {
                Success = true,
                TopArtists = topArtists
            });
        }
        catch (Exception e)
        {
            return BadRequest(new {message = e.Message});
        }
    }

    [HttpGet("top-songs-all")]
    public async Task<IActionResult> GetTopSongs([FromBody] NIntervalTopScrobblesRequest request)
    {
        try
        {
            List<SongScrobbleCount> topSongs = await _scrobbleService.FetchTopNSongsScrobbles(request.N, request.Start, request.End);
            return Ok(new TopNSongsScrobblesResponse
            {
                Success = true,
                TopSongs = topSongs
            });
        }
        catch (Exception e)
        {
            return BadRequest(new {message = e.Message});
        }
    }

    [HttpGet("top-albums-all")]
    public async Task<IActionResult> GetTopAlbums([FromBody] NIntervalTopScrobblesRequest request)
    {
        try
        {
            List<AlbumScrobbleCount> topAlbums = await _scrobbleService.FetchTopNAlbumsScrobbles(request.N, request.Start, request.End);
            return Ok(new TopNAlbumsScrobblesResponse
            {
                Success = true,
                TopAlbums = topAlbums
            });
        }
        catch (Exception e)
        {
            return BadRequest(new {message = e.Message});
        }
    }

    [HttpGet("top-artists-all")]
    public async Task<IActionResult> GetTopArtists([FromBody] NIntervalTopScrobblesRequest request)
    {
        try
        {
            List<ArtistScrobbleCount> topArtists = await _scrobbleService.FetchTopNArtistsScrobbles(request.N, request.Start, request.End);
            return Ok(new TopNArtistsScrobblesResponse
            {
                Success = true,
                TopArtists = topArtists
            });
        }
        catch (Exception e)
        {
            return BadRequest(new {message = e.Message});
        }
    }
}