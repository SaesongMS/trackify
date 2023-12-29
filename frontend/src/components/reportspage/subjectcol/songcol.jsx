import Card from "./card";
import Row from "./row";

function SongCol(props){
    const {songs} = props;
    return(
        <div class="flex flex-col mx-2">
            <h1 class="text-2xl font-bold">Top Songs</h1>
            <Card
                cover={`data:image/png;base64,${songs[0].song.album.cover}`}
                mainText={songs[0].song.title}
                secText={songs[0].song.album.artist.name}
                subject="song"
            />
            <div>
                {songs.slice(1).map((song, index) => (
                    <Row photo={song.song.album.cover} textMain={song.song.title} textSecondary={song.song.album.artist.name} type={"song"} typeSecondary={"artist"} index={index} />
                ))}
            </div>
            
        </div>
    )
}

export default SongCol;