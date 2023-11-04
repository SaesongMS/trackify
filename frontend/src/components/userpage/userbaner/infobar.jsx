import Counter from "./counter";
function InfoBar(props){
    const { username, date, trackCount, artistCount, songsCount, ...others } = props;
    return(
        <div class="flex h-[80%] pb-2">
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
    )
}
export default InfoBar;