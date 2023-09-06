using Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Models;


namespace Helpers;

public class ScrobbleService
{
    private readonly DatabaseContext _context;

    public ScrobbleService(DatabaseContext context)
    {
        _context = context;
    }

    public async Task<List<Scrobble>> GetRecentScrobbles(string userId, int n)
    {
        return await _context.Scrobbles
            .Where(s => s.Id_User == userId)
            .OrderByDescending(s => s.Scrobble_Date)
            .Take(n)
            .ToListAsync();
    }
}
