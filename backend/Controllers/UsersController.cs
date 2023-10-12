using Data;
using Helpers;
using Models;
using DTOs;
using Services;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Security.Claims;

namespace Controllers;

[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
  private readonly JWTCreator _jwtCreator;
  private readonly AuthenticationService _authenticationService;
  private readonly UserService _userService;

  public UsersController(JWTCreator jwtCreator, AuthenticationService authenticationService, UserService userService)
  {
    _jwtCreator = jwtCreator;
    _authenticationService = authenticationService;
    _userService = userService;
  }

  [HttpPost("register")]
  public async Task<IActionResult> Register([FromBody] RegisterRequest registerRequest)
  {
    try
    {
      var result = await _authenticationService.Register(registerRequest);

      if (result)
      {
        result = await _authenticationService.AddRole(registerRequest.Username, "User");
        if (!result)
          return BadRequest(new RegisterResponse { Success = false, Message = "Could not add role to user" });
        return Ok(new RegisterResponse { Success = true, Message = "Registration successful" });
      }

      return BadRequest(new RegisterResponse { Success = false, Message = "Registration failed" });
    }
    catch (Exception ex)
    {
      return BadRequest(new RegisterResponse { Success = false, Message = ex.Message });
    }
  }

  [HttpPost("login")]
  public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
  {
    try
    {
      var result = await _authenticationService.Login(loginRequest);

      if (result)
      {
        var user = await _authenticationService.GetUser(loginRequest.Username);
        var roles = await _authenticationService.GetRoles(loginRequest.Username);
        var token = _jwtCreator.Generate(user, roles);

        Response.Cookies.Append("X-Access-Token", token, new CookieOptions
        {
          HttpOnly = true,
          SameSite = SameSiteMode.Strict,
          Expires = DateTimeOffset.UtcNow.AddDays(7)
        });

        return Ok(new LoginResponse { Success = true, Message = "Login successful" });
      }

      return BadRequest(new LoginResponse { Success = false, Message = "Login failed" });
    }
    catch (Exception ex)
    {
      return BadRequest(new LoginResponse { Success = false, Message = ex.Message });
    }
  }

  [HttpGet("ping")]
  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
  public IActionResult Ping()
  {
    return Ok(new { Success = true, Message = "Pong" });
  }

  [HttpGet("admin")]
  [Authorize(Roles = "Admin")]
  public IActionResult Admin()
  {
    return Ok(new { Success = true, Message = "Admin" });
  }

  [HttpGet("user")]
  [Authorize(Roles = "User")]
  public IActionResult user()
  {
    return Ok(new { Success = true, Message = "User" });
  }

  [HttpGet("{username}")]
  public async Task<IActionResult> UserProfileData(string username)
  {
    try
    {
      var data = await _userService.FetchProfileData(username);

      if (data != null)
        return Ok(data);
      else
        return BadRequest(new { Success = false, Message = "User was not found" });
    }
    catch (Exception e)
    {
      Console.WriteLine($"Error fetching profile data: {e}");
      return BadRequest(new { Success = false, Message = e });
    }
  }

  [HttpPatch("{username}")]
  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
  public async Task<IActionResult> UserBioAvatarEdit(string username, [FromBody] EditUsersProfileRequest request)
  {
    var nameIdentifier = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    var roles = User.FindAll(ClaimTypes.Role).Select(r => r.Value).ToList();

    try
    {
      var user = await _authenticationService.GetUser(nameIdentifier);
      var response = await _userService.EditProfileData(username, request.Bio, request.Avatar, user.Id, roles);

      switch (response)
      {
        case 200:
          return Ok(new { Success = true, Message = "User was successfully edited" });
        case 404:
          return NotFound(new { Success = false, Message = "User was not found in database" });
        case 403:
          return Unauthorized(new { Success = false, Message = "Unauthorized attempt to edit users profile data" });
        case 400:
          return BadRequest(new { Success = false, Message = "Error updating database" });
        default:
          return StatusCode(500, new { Success = false, Message = "An unexpected error occurred" });
      }

    }
    catch (Exception e)
    {
      Console.WriteLine($"Error editing profile data: {e}");
      return BadRequest(new { Success = false, Message = e });
    }
  }

}