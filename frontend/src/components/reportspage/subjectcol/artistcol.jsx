import Card from "./card";
import Row from "./row";

function ArtistCol(props){
    const {artists} = props;
    return(
        <div class="flex flex-col mx-2">
            <h1 class="text-2xl font-bold">Top Artists</h1>
            <div class="">
                <Card
                    cover={`data:image/png;base64,${artists[0].artist.photo}`}
                    mainText={artists[0].artist.name}
                    subject="artist"
                />
            </div>
            <div>
                {artists.slice(1).map((a, index) => (
                    <Row photo={a.artist.photo} textMain={a.artist.name} type={"artist"} index={index} />
                ))}
            </div>
            
        </div>
    )
}

export default ArtistCol;