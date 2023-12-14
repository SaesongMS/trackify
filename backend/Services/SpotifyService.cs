using System.Text;
using Models;
using Newtonsoft.Json.Linq;
using Helpers;
using Data;
using DTOs;
using Microsoft.IdentityModel.Tokens;

namespace Services;

public class SpotifyService
{
    private readonly SpotifySettings _spotifySettings;
    private string _accessToken;
    private readonly DatabaseContext _context;

    public SpotifyService(SpotifySettings spotifySettings, DatabaseContext context)
    {
        _spotifySettings = spotifySettings;
        _context = context;
        _accessToken = GetAccesToken().Result;
    }


    public async Task<string> GetAccesToken()
    {
        var client = new HttpClient();
        var request = new HttpRequestMessage(HttpMethod.Post, "https://accounts.spotify.com/api/token");
        var base64authorization = Convert.ToBase64String(Encoding.ASCII.GetBytes($"{_spotifySettings.ClientId}:{_spotifySettings.ClientSecret}"));
        request.Headers.TryAddWithoutValidation("Authorization", $"Basic {base64authorization}");
        request.Content = new FormUrlEncodedContent(new Dictionary<string, string>
        {
            {"grant_type", "refresh_token"},
            {"refresh_token", _spotifySettings.RefreshToken}
        });
        var response = await client.SendAsync(request);
        if (response.IsSuccessStatusCode)
        {
            var responseContent = await response.Content.ReadAsStringAsync();
            var json = JObject.Parse(responseContent);
            return json["access_token"].ToString();
        }

        return null;
    }

    private async Task<byte[]> GetImage(string url)
    {
        Console.WriteLine(url);
        using var client = new HttpClient();
        using var response = await client.GetAsync(url);
        byte[] imageBytes = await response.Content
            .ReadAsByteArrayAsync()
            .ConfigureAwait(false);

        Console.WriteLine(imageBytes.Length);

        return imageBytes;
    }

    public async Task<Artist> GetArtist(string id)
    {
        var client = new HttpClient();
        var request = new HttpRequestMessage(HttpMethod.Get, $"https://api.spotify.com/v1/artists/{id}");
        request.Headers.TryAddWithoutValidation("Authorization", $"Bearer {_accessToken}");
        var response = await client.SendAsync(request);
        if (response.IsSuccessStatusCode)
        {
            var responseContent = await response.Content.ReadAsStringAsync();
            var json = JObject.Parse(responseContent);
            return new Artist
            {
                Id = Guid.NewGuid().ToString(),
                Name = json["name"].ToString(),
                Id_Artist_Spotify_API = json["id"].ToString(),
                Photo = await GetImage(json["images"].ToArray().Length == 0 ? "https://i.scdn.co/image/ab67616d00001e0299760923cfbfe739fb870817" : json["images"][0]["url"].ToString()),
                Description = ""
            };
        }

        Console.WriteLine(response.StatusCode);
        Console.WriteLine(response.Content.ReadAsStringAsync().Result);

        return null;
    }

    public async Task<Album> GetAlbum(string id, Artist artist)
    {
        var client = new HttpClient();
        var request = new HttpRequestMessage(HttpMethod.Get, $"https://api.spotify.com/v1/albums/{id}");
        request.Headers.TryAddWithoutValidation("Authorization", $"Bearer {_accessToken}");
        var response = await client.SendAsync(request);
        if (response.IsSuccessStatusCode)
        {
            var responseContent = await response.Content.ReadAsStringAsync();
            var json = JObject.Parse(responseContent);
            var album = new Album
            {
                Id = Guid.NewGuid().ToString(),
                Name = json["name"].ToString(),
                Id_Album_Spotify_API = json["id"].ToString(),
                Cover = await GetImage(json["images"][0]["url"].ToString()),
                Description = "",
                Id_Artist_Internal = artist.Id,
                Artist = artist
            };
            return album;
        }

        Console.WriteLine(response.StatusCode);
        Console.WriteLine(response.Content.ReadAsStringAsync().Result);

        return null;
    }

    public async Task<Song> GetSong(string id, Album album)
    {
        var client = new HttpClient();
        var request = new HttpRequestMessage(HttpMethod.Get, $"https://api.spotify.com/v1/tracks/{id}");
        request.Headers.TryAddWithoutValidation("Authorization", $"Bearer {_accessToken}");
        var response = await client.SendAsync(request);
        if (response.IsSuccessStatusCode)
        {
            var responseContent = await response.Content.ReadAsStringAsync();
            var json = JObject.Parse(responseContent);
            return new Song
            {
                Id = Guid.NewGuid().ToString(),
                Title = json["name"].ToString(),
                Id_Song_Spotify_API = json["id"].ToString(),
                Description = "",
                Id_Album_Internal = album.Id,
                Album = album
            };
        }

        Console.WriteLine(response.StatusCode);
        Console.WriteLine(response.Content.ReadAsStringAsync().Result);

        return null;
    }

    public async Task<String> GetUserAccessToken(User user, string refresh_token)
    {
        var client = new HttpClient();
        var request = new HttpRequestMessage(HttpMethod.Post, "https://accounts.spotify.com/api/token");
        var urlSearchParams = new Dictionary<string, string>
        {
            {"grant_type", "refresh_token"},
            {"refresh_token", refresh_token},
            {"client_id", _spotifySettings.ClientId}
        };
        request.Content = new FormUrlEncodedContent(urlSearchParams);
        request.Headers.TryAddWithoutValidation("Content-Type", "application/x-www-form-urlencoded");
        var response = await client.SendAsync(request);

        if (response.IsSuccessStatusCode)
        {
            var responseContent = await response.Content.ReadAsStringAsync();
            var json = JObject.Parse(responseContent);
            user.RefreshToken = json["refresh_token"].ToString();
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return json["access_token"].ToString();
        }

        Console.WriteLine(response.StatusCode);
        Console.WriteLine(response.Content.ReadAsStringAsync().Result);

        return null;
    }
    
    public async Task<JObject> GetRecentlyPlayed(string access_token, long after )
    {
        var client = new HttpClient();
        var request = new HttpRequestMessage(HttpMethod.Get, "https://api.spotify.com/v1/me/player/recently-played?limit=20&after=" + after);
        request.Headers.TryAddWithoutValidation("Authorization", $"Bearer {access_token}");
        var response = await client.SendAsync(request);
        if (response.IsSuccessStatusCode)
        {
            var responseContent = await response.Content.ReadAsStringAsync();
            var json = JObject.Parse(responseContent);
            return json;
        }

        Console.WriteLine(response.StatusCode);
        Console.WriteLine(response.Content.ReadAsStringAsync().Result);

        return JObject.Parse("{error: true}");
    }

    public async Task<SongRecommendations> GetSongRecommendations(string artistId, string songId)
    {
        var client = new HttpClient();
        var request = new HttpRequestMessage(HttpMethod.Get, $"https://api.spotify.com/v1/recommendations?limit=5&seed_artists={artistId}&seed_tracks={songId}");
        request.Headers.TryAddWithoutValidation("Authorization", $"Bearer {_accessToken}");
        var response = await client.SendAsync(request);
        if (response.IsSuccessStatusCode)
        {
            var responseContent = await response.Content.ReadAsStringAsync();
            var json = JObject.Parse(responseContent);
            return new SongRecommendations{
                Songs = json["tracks"].Select(song => new ReccomendedSong{
                    Title = song["name"].ToString(),
                    Id = song["id"].ToString(),
                    Artist = song["artists"][0]["name"].ToString(),
                    Cover = song["album"]["images"][0]["url"].ToString()
                }).ToList()
            };
        }

        Console.WriteLine(response.StatusCode);
        Console.WriteLine(response.Content.ReadAsStringAsync().Result);

        return new SongRecommendations{
            Songs = new List<ReccomendedSong>()
        };
    }

    public async Task<ArtistRecommendations> GetArtistRecommendations(string artistId)
    {
        var client = new HttpClient();
        var request = new HttpRequestMessage(HttpMethod.Get, $"https://api.spotify.com/v1/artists/{artistId}/related-artists");
        request.Headers.TryAddWithoutValidation("Authorization", $"Bearer {_accessToken}");
        var response = await client.SendAsync(request);
        if (response.IsSuccessStatusCode)
        {
            var responseContent = await response.Content.ReadAsStringAsync();
            var json = JObject.Parse(responseContent);
            return new ArtistRecommendations{
                Artists = json["artists"].Select(artist => new ReccomendedArtist{
                    Name = artist["name"].ToString(),
                    Id = artist["id"].ToString(),
                    Photo = artist["images"][0]["url"].ToString()
                }).Take(5).ToList()
            };
        }

        Console.WriteLine(response.StatusCode);
        Console.WriteLine(response.Content.ReadAsStringAsync().Result);

        return new ArtistRecommendations{
            Artists = new List<ReccomendedArtist>()
        };
    }

}