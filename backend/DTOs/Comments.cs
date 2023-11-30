using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DTOs;

public class CreateProfileCommentRequest
{
    [Required]
    public string Comment { get; set; } = string.Empty;
    [Required]
    public string RecipientId { get; set; } = string.Empty;
}

public class CreateSongCommentRequest
{
    [Required]
    public string Comment { get; set; } = string.Empty;
    [Required]
    public string SongId { get; set; } = string.Empty;
}

public class CreateAlbumCommentRequest
{
    [Required]
    public string Comment { get; set; } = string.Empty;
    [Required]
    public string AlbumId { get; set; } = string.Empty;
}

public class CreateArtistCommentRequest
{
    [Required]
    public string Comment { get; set; } = string.Empty;
    [Required]
    public string ArtistId { get; set; } = string.Empty;
}

public class CreateCommentResponse
{
    public string Message { get; set; } = string.Empty;
    public bool Success { get; set; }

    public ProfileComment? ProfileComment { get; set; }
}

public class CreateSongCommentResponse
{
    public string Message { get; set; } = string.Empty;
    public bool Success { get; set; }
    public SongComment? SongComment { get; set; }
}

public class CreateAlbumCommentResponse
{
    public string Message { get; set; } = string.Empty;
    public bool Success { get; set; }
    public AlbumComment? AlbumComment { get; set; }
}

public class CreateArtistCommentResponse
{
    public string Message { get; set; } = string.Empty;
    public bool Success { get; set; }
    public ArtistComment? ArtistComment { get; set; }
}