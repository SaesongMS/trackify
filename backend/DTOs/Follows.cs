using System.ComponentModel.DataAnnotations;
using Models;

namespace DTOs;

public class FollowRequest
{
    [Required]
    public string UserId { get; set; } = string.Empty;
}

public class FollowResponse
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
}

public class FollowedResponse
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public List<string> FollowedId { get; set; } = new List<string>();
}