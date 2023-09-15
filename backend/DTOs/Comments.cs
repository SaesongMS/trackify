using System.ComponentModel.DataAnnotations;
using Models;

namespace DTOs;

public class CreateCommentRequest
{
    [Required]
    public string Comment { get; set; } = string.Empty;
    [Required]
    public string RecipientId { get; set; } = string.Empty;
}

public class CreateCommentResponse
{
    public string Message { get; set; } = string.Empty;
    public bool Success { get; set; }
}