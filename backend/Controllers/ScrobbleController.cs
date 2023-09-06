using Microsoft.AspNetCore.Mvc;
using Models;
using Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;


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
    public async Task<IActionResult> GetRecentScrobbles()
    {
        //get id from token
        //get scrobbles from db
        //return scrobbles
        var nameIdentifier = User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
        Console.WriteLine(nameIdentifier);
        try
        {
            var user = await _authenticationService.GetUser(nameIdentifier);

            var scrobbles = await _scrobbleService.GetRecentScrobbles(user.Id);

            return Ok();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return BadRequest();
        }
        
    }


}