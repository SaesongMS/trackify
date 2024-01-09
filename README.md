# Praca dyplomowa inzynierska
## Temat: Serwis społecznościowy do śledzenia i analizy danych z serwisu Spotify.
### Topic: Social networking service with Spotify data tracking and analysis.
## Uruchomienie / Run

### Frontend
```
npm install
npm start
```

### Backend
```
dotnet run
lub
docker compose up backend
```
Treść pliku appsettings.Development.json potrzebnego do poprawnego działania backendu znajduje się [tutaj](https://pastebin.com/N8xQYHQA)

### Baza danych / Database
```
docker compose up db
```
#### Migracje / Migrations
```
dotnet ef migrations add <nazwa migracji>
(migracje sa juz gotowe)

dotnet ef database update
```

### Aplikacja w kontenerach / Application in containers
```
docker compose up --build
```

### Wygląd aplikacji/ UI of application
- **Profil / Profile:**
![Imgur](https://imgur.com/YtZaAPO.gif)
- **Ustawienia / Settings:**
![Imgur](https://imgur.com/L81MiQQ.gif)
- **Generowanie kolaży / Collage generation:**
![Imgur](https://imgur.com/TNewSU8.gif)
- **Raporty (Statystyki) / Reports (Statistics):**
![Imgur](https://imgur.com/u6puZRr.gif)
- **Rankingi podmiotów / Rankings of top subjects (Charts)**
![Imgur](https://imgur.com/cy19nh8.gif)
- **Wyszukiwanie / Search:**
![Imgur](https://imgur.com/oSlK370.gif)
- **Strona podmiotu / Subject page:**
![Imgur](https://imgur.com/5BcHGvJ.gif)



