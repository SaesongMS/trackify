﻿// <auto-generated />
using System;
using Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    partial class DatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("text");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .HasColumnType("text");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Value")
                        .HasColumnType("text");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("Models.Album", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text")
                        .HasColumnName("id");

                    b.Property<string>("ArtistId")
                        .HasColumnType("text");

                    b.Property<byte[]>("Cover")
                        .IsRequired()
                        .HasColumnType("bytea")
                        .HasColumnName("cover");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("description");

                    b.Property<string>("Id_Album_Spotify_API")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("id_album_spotify_api");

                    b.Property<string>("Id_Artist_Internal")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("id_artist_internal");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.HasKey("Id");

                    b.HasIndex("ArtistId");

                    b.ToTable("albums", (string)null);
                });

            modelBuilder.Entity("Models.AlbumComment", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text")
                        .HasColumnName("id");

                    b.Property<string>("AlbumId")
                        .HasColumnType("text");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("content");

                    b.Property<DateTime>("Creation_Date")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("creation_date");

                    b.Property<string>("Id_Album_Internal")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("id_album_internal");

                    b.Property<string>("Id_User")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("id_user");

                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AlbumId");

                    b.HasIndex("UserId");

                    b.ToTable("albumsComment", (string)null);
                });

            modelBuilder.Entity("Models.AlbumRating", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text")
                        .HasColumnName("id");

                    b.Property<string>("AlbumId")
                        .HasColumnType("text");

                    b.Property<string>("Id_Album_Internal")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("id_album_internal");

                    b.Property<string>("Id_User")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("id_user");

                    b.Property<int>("Rating")
                        .HasColumnType("integer")
                        .HasColumnName("rating");

                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AlbumId");

                    b.HasIndex("UserId");

                    b.ToTable("albumsRating", (string)null);
                });

            modelBuilder.Entity("Models.Artist", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text")
                        .HasColumnName("id");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("description");

                    b.Property<string>("Id_Artist_Spotify_API")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("id_artist_spotify_api");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<byte[]>("Photo")
                        .IsRequired()
                        .HasColumnType("bytea")
                        .HasColumnName("photo");

                    b.HasKey("Id");

                    b.ToTable("artists", (string)null);
                });

            modelBuilder.Entity("Models.ArtistComment", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text")
                        .HasColumnName("id");

                    b.Property<string>("ArtistId")
                        .HasColumnType("text");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("content");

                    b.Property<DateTime>("Creation_Date")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("creation_date");

                    b.Property<string>("Id_Artist_Internal")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("id_artist_internal");

                    b.Property<string>("Id_User")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("id_user");

                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("ArtistId");

                    b.HasIndex("UserId");

                    b.ToTable("artistsComment", (string)null);
                });

            modelBuilder.Entity("Models.ArtistRating", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text")
                        .HasColumnName("id");

                    b.Property<string>("ArtistId")
                        .HasColumnType("text");

                    b.Property<string>("Id_Artist_Internal")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("id_artist_internal");

                    b.Property<string>("Id_User")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("id_user");

                    b.Property<int>("Rating")
                        .HasColumnType("integer")
                        .HasColumnName("rating");

                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("ArtistId");

                    b.HasIndex("UserId");

                    b.ToTable("artistsRating", (string)null);
                });

            modelBuilder.Entity("Models.FavouriteSong", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text")
                        .HasColumnName("id");

                    b.Property<string>("Id_Song_Internal")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("id_song_internal");

                    b.Property<string>("Id_User")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("id_user");

                    b.Property<string>("SongId")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("SongId");

                    b.HasIndex("UserId");

                    b.ToTable("favouriteSongs", (string)null);
                });

            modelBuilder.Entity("Models.Follow", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text")
                        .HasColumnName("id");

                    b.Property<string>("FollowerId")
                        .HasColumnType("text");

                    b.Property<string>("Id_Followed")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("id_followed");

                    b.Property<string>("Id_Follower")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("id_follower");

                    b.HasKey("Id");

                    b.HasIndex("FollowerId");

                    b.ToTable("follows", (string)null);
                });

            modelBuilder.Entity("Models.ProfileComment", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text")
                        .HasColumnName("id");

                    b.Property<string>("Comment")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("comment");

                    b.Property<DateTime>("Creation_Date")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("creation_date");

                    b.Property<string>("Id_Recipient")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("id_recipient");

                    b.Property<string>("Id_Sender")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("id_sender");

                    b.Property<string>("SenderId")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("SenderId");

                    b.ToTable("profileComments", (string)null);
                });

            modelBuilder.Entity("Models.Scrobble", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text")
                        .HasColumnName("id");

                    b.Property<string>("Id_Song_Internal")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("id_song_internal");

                    b.Property<string>("Id_User")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("id_user");

                    b.Property<DateTime>("Scrobble_Date")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("scrobble_date");

                    b.Property<string>("SongId")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("SongId");

                    b.HasIndex("UserId");

                    b.ToTable("scrobbles", (string)null);
                });

            modelBuilder.Entity("Models.Song", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text")
                        .HasColumnName("id");

                    b.Property<string>("AlbumId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("description");

                    b.Property<string>("Id_Album_Internal")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("id_album_internal");

                    b.Property<string>("Id_Song_Spotify_API")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("id_song_spotify_api");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("title");

                    b.HasKey("Id");

                    b.HasIndex("AlbumId");

                    b.ToTable("songs", (string)null);
                });

            modelBuilder.Entity("Models.SongComment", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text")
                        .HasColumnName("id");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("content");

                    b.Property<DateTime>("Creation_Date")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("creation_date");

                    b.Property<string>("Id_Sender")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("id_sender");

                    b.Property<string>("Id_Song_Internal")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("id_song_internal");

                    b.Property<string>("SenderId")
                        .HasColumnType("text");

                    b.Property<string>("SongId")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("SenderId");

                    b.HasIndex("SongId");

                    b.ToTable("songsComments", (string)null);
                });

            modelBuilder.Entity("Models.SongRating", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text")
                        .HasColumnName("id");

                    b.Property<string>("Id_Song_Internal")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("id_song_internal");

                    b.Property<string>("Id_User")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("id_user");

                    b.Property<int>("Rating")
                        .HasColumnType("integer")
                        .HasColumnName("rating");

                    b.Property<string>("SongId")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("SongId");

                    b.HasIndex("UserId");

                    b.ToTable("songsRating", (string)null);
                });

            modelBuilder.Entity("Models.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("integer");

                    b.Property<byte[]>("Avatar")
                        .IsRequired()
                        .HasColumnType("bytea");

                    b.Property<string>("Bio")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<DateTime>("Creation_Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("boolean");

                    b.Property<string>("Id_User_Spotify_API")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("boolean");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("boolean");

                    b.Property<string>("RefreshToken")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("text");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("boolean");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Models.Album", b =>
                {
                    b.HasOne("Models.Artist", "Artist")
                        .WithMany("Albums")
                        .HasForeignKey("ArtistId");

                    b.Navigation("Artist");
                });

            modelBuilder.Entity("Models.AlbumComment", b =>
                {
                    b.HasOne("Models.Album", "Album")
                        .WithMany()
                        .HasForeignKey("AlbumId");

                    b.HasOne("Models.User", "User")
                        .WithMany("AlbumComments")
                        .HasForeignKey("UserId");

                    b.Navigation("Album");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Models.AlbumRating", b =>
                {
                    b.HasOne("Models.Album", "Album")
                        .WithMany()
                        .HasForeignKey("AlbumId");

                    b.HasOne("Models.User", "User")
                        .WithMany("AlbumRatings")
                        .HasForeignKey("UserId");

                    b.Navigation("Album");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Models.ArtistComment", b =>
                {
                    b.HasOne("Models.Artist", "Artist")
                        .WithMany()
                        .HasForeignKey("ArtistId");

                    b.HasOne("Models.User", "User")
                        .WithMany("ArtistComments")
                        .HasForeignKey("UserId");

                    b.Navigation("Artist");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Models.ArtistRating", b =>
                {
                    b.HasOne("Models.Artist", "Artist")
                        .WithMany()
                        .HasForeignKey("ArtistId");

                    b.HasOne("Models.User", "User")
                        .WithMany("ArtistRatings")
                        .HasForeignKey("UserId");

                    b.Navigation("Artist");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Models.FavouriteSong", b =>
                {
                    b.HasOne("Models.Song", "Song")
                        .WithMany("FavouriteSongs")
                        .HasForeignKey("SongId");

                    b.HasOne("Models.User", "User")
                        .WithMany("FavouriteSongs")
                        .HasForeignKey("UserId");

                    b.Navigation("Song");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Models.Follow", b =>
                {
                    b.HasOne("Models.User", "Follower")
                        .WithMany("Follows")
                        .HasForeignKey("FollowerId");

                    b.Navigation("Follower");
                });

            modelBuilder.Entity("Models.ProfileComment", b =>
                {
                    b.HasOne("Models.User", "Sender")
                        .WithMany("ProfileComments")
                        .HasForeignKey("SenderId");

                    b.Navigation("Sender");
                });

            modelBuilder.Entity("Models.Scrobble", b =>
                {
                    b.HasOne("Models.Song", "Song")
                        .WithMany("Scrobbles")
                        .HasForeignKey("SongId");

                    b.HasOne("Models.User", "User")
                        .WithMany("Scrobbles")
                        .HasForeignKey("UserId");

                    b.Navigation("Song");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Models.Song", b =>
                {
                    b.HasOne("Models.Album", "Album")
                        .WithMany("Songs")
                        .HasForeignKey("AlbumId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Album");
                });

            modelBuilder.Entity("Models.SongComment", b =>
                {
                    b.HasOne("Models.User", "Sender")
                        .WithMany("SongComments")
                        .HasForeignKey("SenderId");

                    b.HasOne("Models.Song", "Song")
                        .WithMany("SongComments")
                        .HasForeignKey("SongId");

                    b.Navigation("Sender");

                    b.Navigation("Song");
                });

            modelBuilder.Entity("Models.SongRating", b =>
                {
                    b.HasOne("Models.Song", "Song")
                        .WithMany("SongRatings")
                        .HasForeignKey("SongId");

                    b.HasOne("Models.User", "User")
                        .WithMany("SongRatings")
                        .HasForeignKey("UserId");

                    b.Navigation("Song");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Models.Album", b =>
                {
                    b.Navigation("Songs");
                });

            modelBuilder.Entity("Models.Artist", b =>
                {
                    b.Navigation("Albums");
                });

            modelBuilder.Entity("Models.Song", b =>
                {
                    b.Navigation("FavouriteSongs");

                    b.Navigation("Scrobbles");

                    b.Navigation("SongComments");

                    b.Navigation("SongRatings");
                });

            modelBuilder.Entity("Models.User", b =>
                {
                    b.Navigation("AlbumComments");

                    b.Navigation("AlbumRatings");

                    b.Navigation("ArtistComments");

                    b.Navigation("ArtistRatings");

                    b.Navigation("FavouriteSongs");

                    b.Navigation("Follows");

                    b.Navigation("ProfileComments");

                    b.Navigation("Scrobbles");

                    b.Navigation("SongComments");

                    b.Navigation("SongRatings");
                });
#pragma warning restore 612, 618
        }
    }
}
