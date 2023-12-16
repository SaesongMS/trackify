import Card from "./card";
import Row from "./row";

function AlbumCol(props){
    const {albums} = props;
    console.log(albums);
    return(
        <div class="flex flex-col mx-2">
            <h1 class="text-2xl font-bold">Top albums</h1>
            <div class="">
                <Card
                    cover={`data:image/png;base64,${albums[0].album.cover}`}
                    mainText={albums[0].album.name}
                    secText={albums[0].album.artist.name}
                    subject="album"
                />
            </div>
            <div>
                {albums.slice(1).map((a, index) => (
                    <Row photo={a.album.cover} textMain={a.album.name} textSecondary={a.album.artist.name} type={"album"} typeSecondary={"artist"} index={index} />
                ))}
            </div>
            
        </div>
    )
}

export default AlbumCol;