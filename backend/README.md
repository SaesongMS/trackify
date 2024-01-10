## Konfiguracja backendu / Setting up backend
Utwórz plik appsettings.Development.json w katalogu backend z następującą zawartością /<br/>
Create appsettings.Development.json file in backend directory with following content:
```json
{
    "ConnectionStrings": {
      "DefaultConnection": "" // your connection string eg. Host=localhost;Port=5432;Database=pg;Username=user;Password=password;
    },
    "JWTSettings":{
      "Key":"", // 32 characters long key
      "Issuer":"", // e.g. http://localhost:5000
      "Audience":"", // e.g. http://localhost:3000
      "DurationInMinutes": // e.g. 60
    },
    "SpotifySettings":{
      "ClientId":"", // your client id from spotify developer dashboard
      "ClientSecret":"", // your client secret from spotify developer dashboard
      "RefreshToken":"" // your refresh token
    }
  }
```
Token odświeżania można uzyskać, korzystając z mojego [projektu](https://github.com/SaesongMS/get-spotifyapi-refresh-token).<br/>
You can get refresh token using my [project](https://github.com/SaesongMS/get-spotifyapi-refresh-token)