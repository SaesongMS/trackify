using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using DTOs;
using System.Security.Claims;


namespace Controllers;
[ApiController]
[Route("api/search")]
public class SearchController : ControllerBase
{
    //add userService, songService, albumService and artistService
    private readonly UserService _userService;
    private readonly ScrobbleService _scrobbleService;

    public SearchController(UserService userService, ScrobbleService scrobbleService)
    {
        _userService = userService;
        _scrobbleService = scrobbleService;
    }

    [HttpGet("{query}")]
    public async Task<IActionResult> Search(string query)
    {
        query = query.ToLower();
        try
        {
            List<UserProfile> users = await _userService.SearchUsers(query);
            List<Song> songs = await _scrobbleService.SearchSongs(query);
            List<Album> albums = await _scrobbleService.SearchAlbums(query);
            List<Artist> artists = await _scrobbleService.SearchArtists(query);
            return Ok(new SearchResponse
            {
                Success = true,
                Users = users,
                Songs = songs,
                Albums = albums,
                Artists = artists
            });
        }
        catch (Exception e)
        {
            return BadRequest(new { message = e.Message });
        }
    }


}