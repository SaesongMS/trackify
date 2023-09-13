using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using DTOs;


namespace Controllers;
[ApiController]
[Route("api/ratings")]
public class RatingController: ControllerBase
{
    private readonly RatingService _ratingService;
    private readonly AuthenticationService _authenticationService;

    public RatingController(RatingService ratingService, AuthenticationService authenticationService)
    {
        _ratingService = ratingService;
        _authenticationService = authenticationService;
    }

    [HttpPost("create-song")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> RateSong([FromBody] CreateRateSongRequest request)
    {
        var nameIdentifier = User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
        try
        {
            var user = await _authenticationService.GetUser(nameIdentifier);
            if(await _ratingService.CreateRatingForSong(request.SongId, request.Rating, user.Id))
                return Ok(new CreateRateSongResponse
                {
                    Success = true,
                    Message = "Rating for this song was created successfully"
                });
            return BadRequest(new CreateScrobbleResponse
                {
                    Success = false,
                    Message = "Rating creation failed"
                });
        }
        catch (Exception e)
        {
            return BadRequest(new {message = e.Message});
        }
    }
    //todo:
    //add patch for everything and add create to artist rating and album


    //for one user
    [HttpGet("rated-songs")]
    public async Task<IActionResult> GetRatedUsersSongs([FromBody] NRatedItemsForUserRequest request)
    {
        try
        {
            List<RatedSong> ratedSongs = await _ratingService.FetchNRatedUsersSongs(request.Id, request.N);
            return Ok(new NRatedUsersSongsResponse
            {
                Success = true,
                RatedSongs = ratedSongs
            });
        }
        catch (Exception e)
        {
            return BadRequest(new {message = e.Message});
        }
    }

    [HttpGet("rated-albums")]
    public async Task<IActionResult> GetRatedUsersAlbums([FromBody] NRatedItemsForUserRequest request)
    {
        try
        {
            List<RatedAlbum> ratedAlbums = await _ratingService.FetchNRatedUsersAlbums(request.Id, request.N);
            return Ok(new RatedNUsersAlbumsResponse
            {
                Success = true,
                RatedAlbums = ratedAlbums
            });
        }
        catch (Exception e)
        {
            return BadRequest(new {message = e.Message});
        }
    }

    [HttpGet("rated-artists")]
    public async Task<IActionResult> GetRatedUsersArtists([FromBody] NRatedItemsForUserRequest request)
    {
        try
        {
            List<RatedArtist> ratedArtists = await _ratingService.FetchNRatedUsersArtists(request.Id, request.N);
            return Ok(new RatedNUsersArtistsResponse
            {
                Success = true,
                RatedArtists = ratedArtists
            });
        }
        catch (Exception e)
        {
            return BadRequest(new {message = e.Message});
        }
    }


    //for all users
    [HttpGet("rated-songs-all")]
    public async Task<IActionResult> GetRatedSongs([FromBody] NRatedItemsRequest request)
    {
        try
        {
            List<AverageRatedSong> ratedSongs = await _ratingService.FetchNRatedSongs(request.N);
            return Ok(new NRatedSongsResponse
            {
                Success = true,
                AverageRatedSongs = ratedSongs
            });
        }
        catch (Exception e)
        {
            return BadRequest(new {message = e.Message});
        }
    }

    [HttpGet("rated-albums-all")]
    public async Task<IActionResult> GetRatedAlbums([FromBody] NRatedItemsRequest request)
    {
        try
        {
            List<AverageRatedAlbum> ratedAlbums = await _ratingService.FetchNRatedAlbums(request.N);
            return Ok(new NRatedAlbumsResponse
            {
                Success = true,
                AverageRatedAlbums = ratedAlbums
            });
        }
        catch (Exception e)
        {
            return BadRequest(new {message = e.Message});
        }
    }

    [HttpGet("rated-artists-all")]
    public async Task<IActionResult> GetRatedArtists([FromBody] NRatedItemsRequest request)
    {
        try
        {
            List<AverageRatedArtist> ratedArtists = await _ratingService.FetchNRatedArtists(request.N);
            return Ok(new NRatedArtistsResponse
            {
                Success = true,
                AverageRatedArtists = ratedArtists
            });
        }
        catch (Exception e)
        {
            return BadRequest(new {message = e.Message});
        }
    }
}