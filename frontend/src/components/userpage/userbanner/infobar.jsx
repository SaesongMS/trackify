import Counter from "./counter";
import { createEffect, createSignal } from "solid-js";
function InfoBar(props){
    const {topArtistImage, ...others} = props;
    const [username, setUsername] = createSignal(null);
    const [date, setDate] = createSignal(null);
    const [trackCount, setTrackCount] = createSignal(null);
    const [artistCount, setArtistCount] = createSignal(null);
    const [songsCount, setSongsCount] = createSignal(null);
    // const [topArtistImage, setTopArtistImage] = createSignal(null);

    createEffect(() => {
        setUsername(props.username);
        setDate(props.date);
        setTrackCount(props.trackCount);
        setArtistCount(props.artistCount);
        setSongsCount(props.songsCount);
    }, [props]);
    
    return(
      <div class="h-[80%] bg-no-repeat bg-cover" style={`background-image: url(${topArtistImage})`}>

        <div class={`h-[100%] flex w-[100%] bg-black bg-opacity-50  text-slate-200 pb-2 pl-2`}>
            
            <div class="flex flex-col justify-end ml-2">
              <div class="text-[40px] font-bold">{username}</div>
              <div>tracking since {date}</div>
            </div>
            <div class="flex ml-12 pl-4">
                <Counter title="Tracks" count={trackCount}/>
                <Counter title="Artists" count={artistCount}/>
                <Counter title="Favourite Songs" count={songsCount}/>
            </div>
          </div>
      </div>
    )
}
export default InfoBar;