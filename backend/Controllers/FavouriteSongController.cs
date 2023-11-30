using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using DTOs;
using System.Security.Claims;


namespace Controllers;
[ApiController]
[Route("api/favourite-song")]
public class FavouriteSongController : ControllerBase
{
    private readonly FavouriteSongService _favouriteSongService;
    private readonly AuthenticationService _authenticationService;

    public FavouriteSongController(FavouriteSongService favouriteSongService, AuthenticationService authenticationService)
    {
        _favouriteSongService = favouriteSongService;
        _authenticationService = authenticationService;
    }

    [HttpPost("create")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<ActionResult> AddSongToFavourites([FromBody] FavouriteSongRequest request)
    {
        var nameIdentifier = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        try
        {
            var user = await _authenticationService.GetUser(nameIdentifier);
            var favouriteSong = await _favouriteSongService.AddFavouriteSong(request.SongId, user);
            if (favouriteSong != null)
                return Ok(new FavouriteSongResponse
                {
                    Success = true,
                    Message = "Song added to favourites successfully",
                    FavouriteSong = favouriteSong
                });
            return BadRequest(new FavouriteSongResponse
            {
                Success = false,
                Message = "Failed to add song to favourites"
            });
        }
        catch (Exception e)
        {
            return BadRequest(new { message = e.Message });
        }
    }

    [HttpDelete("delete")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<ActionResult> DeleteSongFromFavourites([FromBody] FavouriteSongRequest request)
    {
        var nameIdentifier = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        try
        {
            var user = await _authenticationService.GetUser(nameIdentifier);
            var favouriteSong = await _favouriteSongService.DeleteFavouriteSong(request.SongId, user);
            if (favouriteSong != null)
                return Ok(new FavouriteSongResponse
                {
                    Success = true,
                    Message = "Song deleted from favourites successfully",
                    FavouriteSong = favouriteSong
                });
            return BadRequest(new FavouriteSongResponse
            {
                Success = false,
                Message = "Failed to delete song from favourites"
            });
        }
        catch (Exception e)
        {
            return BadRequest(new { message = e.Message });
        }
    }

    //for all users
    //most liked songs
    [HttpGet("most-liked")]
    public async Task<ActionResult> GetMostLikedSongs()
    {
        try
        {
            var songs = await _favouriteSongService.GetMostLikedSongs(10);
            if (songs != null)
                return Ok(new FavouriteSongListResponse
                {
                    Success = true,
                    Message = "Songs retrieved successfully",
                    FavouriteSongs = songs
                });
            return BadRequest(new FavouriteSongListResponse
            {
                Success = false,
                Message = "Failed to retrieve songs"
            });
        }
        catch (Exception e)
        {
            return BadRequest(new { message = e.Message });
        }
    }
}