using System.ComponentModel.DataAnnotations;
using Models;
using Services;

namespace DTOs;

public class ProfileResponse
{
    public string Id { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    public byte[] ProfilePicture { get; set; } = new byte[0];
    public string Description { get; set; } = string.Empty;
    public List<Follow> Followers { get; set; } = new List<Follow>();
    public List<Follow> Following { get; set; } = new List<Follow>();
    public List<ProfileComment> ProfileComments { get; set; } = new List<ProfileComment>();

}

public class EditUsersProfileRequest
{
    public string Bio {get; set;} = string.Empty;

    public string Avatar { get; set; } = string.Empty;
}
