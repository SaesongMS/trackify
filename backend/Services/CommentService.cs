using Data;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Services;

public class CommentService
{
    private readonly DatabaseContext _context;

    public CommentService(DatabaseContext context)
    {
        _context = context;
     
    }

    public async Task<ProfileComment> GetCommentById(string id)
    {
        var comment = await _context.ProfileComments.FirstOrDefaultAsync(c => c.Id == id) ?? throw new Exception("Comment not found");
        return comment;
    }

    public async Task<bool> CreateComment(string comment, string recipientId, User sender)
    {
        var recipient = await _context.Users.FirstOrDefaultAsync(u => u.Id == recipientId) ?? throw new Exception("Recipient not found");
        var profileComment = new ProfileComment
        {
            Id = Guid.NewGuid().ToString(),
            Comment = comment,
            Creation_Date = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, DateTime.Now.Hour,
                DateTime.Now.Minute, DateTime.Now.Second, DateTimeKind.Utc),
            Id_Recipient = recipientId,
            Id_Sender = sender.Id,
            Sender = sender
        };
        await _context.ProfileComments.AddAsync(profileComment);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteComment(string id, List<string> roles, string userId)
    {
        var comment = await _context.ProfileComments.FirstOrDefaultAsync(c => c.Id == id) ?? throw new Exception("Comment not found");
        if (roles.Contains("Admin") || comment.Id_Sender == userId)
        {
            _context.ProfileComments.Remove(comment);
            await _context.SaveChangesAsync();
            return true;
        }

        return false;     
    }
}