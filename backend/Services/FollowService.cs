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
        //user to follow doesn't exist || user to follow the same as logged in || already following -> return false
        var userToFollow = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        if (userToFollow == null || userId == user.Id || await _context.Follows.FirstOrDefaultAsync(u => u.Id_Follower == user.Id && u.Id_Followed == userToFollow.Id) != null) return false;

        var follow = new Follow
        {
            Id = Guid.NewGuid().ToString(),
            Follower = user,
            Id_Follower = user.Id,
            Id_Followed = userToFollow.Id,
            Followed = userToFollow
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

    public async Task<List<string>> GetFollowed(string userId)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        if (user == null) return null;
        var following = await _context.Follows.Where(f => f.Id_Follower == user.Id).ToListAsync();
        return following.Select(f => f.Id_Followed).ToList();

    }

}