# inzynierka
krucyfiks kocham programować

## Uruchomienie

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

### Baza danych
```
docker compose up db
```
#### Migracje
```
dotnet ef migrations add <nazwa migracji>
(migracje sa juz gotowe)

dotnet ef database update
```

### Aplikacja
```
docker compose up --build
```