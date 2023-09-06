using Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Helpers;

namespace Data
{
  public class DatabaseContext : IdentityDbContext<User>
  {
    public DbSet<Follow> Follows { get; set; }
    public DbSet<ProfileComment> ProfileComments { get; set; }

    public DbSet<Scrobble> Scrobbles { get; set; }

    public DbSet<Song> Songs { get; set; }
    public DbSet<SongComment> SongComments { get; set; }
    public DbSet<SongRating> SongRatings { get; set; }
    public DbSet<FavouriteSong> FavouriteSongs { get; set; }

    public DbSet<Album> Albums { get; set; }
    public DbSet<AlbumComment> AlbumComments { get; set; }
    public DbSet<AlbumRating> AlbumRatings { get; set; }

    public DbSet<Artist> Artists { get; set; }
    public DbSet<ArtistComment> ArtistComments { get; set; }
    public DbSet<ArtistRating> ArtistRatings { get; set; }

    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder )
    {
      base.OnConfiguring(optionsBuilder);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      new ScrobbleMap(modelBuilder.Entity<Scrobble>());

      new FollowMap(modelBuilder.Entity<Follow>());
      new ProfileCommentMap(modelBuilder.Entity<ProfileComment>());

      new SongMap(modelBuilder.Entity<Song>());
      new SongCommentMap(modelBuilder.Entity<SongComment>());
      new SongRatingMap(modelBuilder.Entity<SongRating>());
      new FavouriteSongMap(modelBuilder.Entity<FavouriteSong>());

      new AlbumMap(modelBuilder.Entity<Album>());
      new AlbumCommentMap(modelBuilder.Entity<AlbumComment>());
      new AlbumRatingMap(modelBuilder.Entity<AlbumRating>());
      
      new ArtistMap(modelBuilder.Entity<Artist>());
      new ArtistCommentMap(modelBuilder.Entity<ArtistComment>());
      new ArtistRatingMap(modelBuilder.Entity<ArtistRating>());
    }

    
  }
}