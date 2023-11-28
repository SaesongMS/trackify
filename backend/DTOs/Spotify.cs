namespace DTOs;

public class SongRecommendations
{
    public List<ReccomendedSong> Songs { get; set; }
}

public class ReccomendedSong
{
    public string Title { get; set; }
    public string Id { get; set; }
    public string Artist { get; set; }
    public string Cover { get; set; }
}