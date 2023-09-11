using System.Text;
using Models;
using Newtonsoft.Json.Linq;
using Helpers;

namespace Services;

public class SpotifyService
{
    private readonly SpotifySettings _spotifySettings;
    private string _accessToken;

    public SpotifyService(SpotifySettings spotifySettings)
    {
        _spotifySettings = spotifySettings;
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
        using var client = new HttpClient();
        using var response = await client.GetAsync(url);
        byte[] imageBytes = await response.Content
            .ReadAsByteArrayAsync()
            .ConfigureAwait(false);

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
                Photo = await GetImage(json["images"][0]["url"].ToString()),
                Description = ""
            };
        }
        
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
        
        return null;
    }

    
}