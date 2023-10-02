using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using DTOs;


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
        var nameIdentifier = User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
        try
        {
            var user = await _authenticationService.GetUser(nameIdentifier);
            if (await _favouriteSongService.AddFavouriteSong(request.SongId, user))
                return Ok(new FavouriteSongResponse
                {
                    Success = true,
                    Message = "Song added to favourites successfully"
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
        var nameIdentifier = User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
        try
        {
            var user = await _authenticationService.GetUser(nameIdentifier);
            if (await _favouriteSongService.DeleteFavouriteSong(request.SongId, user))
                return Ok(new FavouriteSongResponse
                {
                    Success = true,
                    Message = "Song deleted from favourites successfully"
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
}