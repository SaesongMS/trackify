import Counter from "./counter";
function InfoBar(props){
    const { username, date, trackCount, artistCount, songsCount, topArtistImage, ...others } = props;
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