using Data;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Services;

public class FollowService
{
    private readonly DatabaseContext _context;

    public FollowService(DatabaseContext context)
    {
        _context = context;    
    }

    public async Task<bool> FollowUser(string userId, User user)
    {
        var userToFollow = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        if (userToFollow == null || userId == user.Id) return false;
        var follow = new Follow
        {
            Id = Guid.NewGuid().ToString(),
            Follower = user,
            Id_Follower = user.Id,
            Id_Followed = userToFollow.Id
        };
        await _context.Follows.AddAsync(follow);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> UnfollowUser(string userId, User user)
    {
        var userToUnfollow = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        if (userToUnfollow == null || userId == user.Id) return false;
        var follow = await _context.Follows.FirstOrDefaultAsync(f => f.Id_Follower == user.Id && f.Id_Followed == userToUnfollow.Id);
        if (follow == null) return false;
        _context.Follows.Remove(follow);
        await _context.SaveChangesAsync();
        return true;
    }

}