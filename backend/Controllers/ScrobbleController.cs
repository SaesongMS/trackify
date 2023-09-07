using Microsoft.AspNetCore.Mvc;
using Models;
using Helpers;
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
        Console.WriteLine(request.N);
        Console.WriteLine(request.N.GetType());
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
    
   


}