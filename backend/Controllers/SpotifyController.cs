using Microsoft.AspNetCore.Mvc;
using Services;

namespace Controllers;
[ApiController]
[Route("api/spotify")]
public class SpotifyController : ControllerBase
{
    private readonly SpotifyService _spotifyService;

    public SpotifyController(SpotifyService spotifyService)
    {
        _spotifyService = spotifyService;
    }

    [HttpGet("songRecommendations")]
    public async Task<IActionResult> GetSongRecommendations([FromQuery] string artistId, [FromQuery] string songId)
    {
        var recommendations = await _spotifyService.GetSongRecommendations(artistId, songId);
        return Ok(recommendations);
    }

    [HttpGet("artistRecommendations")]
    public async Task<IActionResult> GetArtistRecommendations([FromQuery] string artistId)
    {
        var recommendations = await _spotifyService.GetArtistRecommendations(artistId);
        return Ok(recommendations);
    }
}