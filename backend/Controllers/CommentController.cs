using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using DTOs;


namespace Controllers;
[ApiController]
[Route("api/comments")]
public class CommentController: ControllerBase
{
    private readonly CommentService _commentService;
    private readonly AuthenticationService _authenticationService;

    public CommentController(CommentService commentService, AuthenticationService authenticationService)
    {
        _commentService = commentService;
        _authenticationService = authenticationService;
    }

    
    [HttpGet("{id}")]
    public async Task<IActionResult> CommentById(string id)
    {
        try
        {
            var comment = await _commentService.GetCommentById(id);
            return Ok(comment);
        }
        catch (Exception e)
        {
            return BadRequest(new {message = e.Message});
        }
        
    }

    [HttpPost("create")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> CreateComment([FromBody] CreateCommentRequest request)
    {
        var nameIdentifier = User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
        try
        {
            var sender = await _authenticationService.GetUser(nameIdentifier);
            if(await _commentService.CreateComment(request.Comment, request.RecipientId, sender))
                return Ok(new CreateCommentResponse
                {
                    Success = true,
                    Message = "Comment created successfully"
                });
            return BadRequest(new CreateCommentResponse
                {
                    Success = false,
                    Message = "Comment creation failed"
                });
        }
        catch (Exception e)
        {
            return BadRequest(new {message = e.Message});
        }
    }

    [HttpDelete("{id}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> DeleteComment(string id)
    {
        var nameIdentifier = User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
        var roles = User.FindAll("http://schemas.microsoft.com/ws/2008/06/identity/claims/role").Select(r => r.Value).ToList();
        var user = await _authenticationService.GetUser(nameIdentifier);
        try
        {
            if(await _commentService.DeleteComment(id, roles, user.Id))    
                return Ok(new {message = "Comment deleted successfully"});
            
            return BadRequest(new {message = "You don't have permission to delete this comment"});
        }
        catch (Exception e)
        {
            return BadRequest(new {message = e.Message});
        }
    }
}