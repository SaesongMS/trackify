import Counter from "./counter";
function InfoBar(props){
    const { username, date, ...others } = props;
    return(
        <div class="flex h-[80%] pb-2">
            <div class="flex flex-col justify-end ml-2">
              <div class="text-[40px] font-bold">{username}</div>
              <div>tracking since {date}</div>
            </div>
            <div class="flex ml-12 pl-4">
                <Counter title="Tracks" count="2137"/>
                <Counter title="Artists" count="2137"/>
                <Counter title="Favourite Songs" count="2137"/>
            </div>
          </div>
    )
}
export default InfoBar;