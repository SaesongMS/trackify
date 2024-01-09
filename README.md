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
- **Profil strona głowna / Profile main page:**
![Imgur](https://imgur.com/oHBTsRg.gif)
- **Profil biblioteka oraz ulubione utwory / Profile library and favorite songs:**
![Imgur](https://imgur.com/KYo9XPu.gif)
- **Ustawienia / Settings:**
![Imgur](https://imgur.com/L81MiQQ.gif)
- **Generowanie kolaży / Collage generation:**
![Imgur](https://imgur.com/TNewSU8.gif)
- **Raporty (Statystyki) / Reports (Statistics):**
![Imgur](https://imgur.com/k3J3zNp.gif)
- **Rankingi podmiotów / Rankings of top subjects (Charts)**
![Imgur](https://imgur.com/iOaP9Zf.gif)
- **Wyszukiwanie / Search:**
![Imgur](https://imgur.com/oSlK370.gif)
- **Strona podmiotu / Subject page:**
![Imgur](https://imgur.com/jC0rvB8.gif)



