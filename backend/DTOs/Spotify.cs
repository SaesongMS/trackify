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

public class ArtistRecommendations
{
    public List<ReccomendedArtist> Artists { get; set; }
}

public class ReccomendedArtist
{
    public string Name { get; set; }
    public string Id { get; set; }
    public string Photo { get; set; }
}