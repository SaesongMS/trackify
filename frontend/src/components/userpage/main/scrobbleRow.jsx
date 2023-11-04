function ScrobbleRow(props){
    const { albumCover, heart, title, artist, rating, date, ...others } = props;

    return(
        <div class="flex w-[100%] pl-3 border border-slate-400  items-center hover:rounded-sm hover:border-slate-500 transition-all duration-150">
                    <span class="mr-4 cursor-pointer">{albumCover}</span>
                    <span class="mr-4 cursor-pointer">Heart</span>
                    <span class="mr-4 cursor-pointer">{title}</span>
                    <span class="mr-4 cursor-pointer">{artist}</span>
                    <span class="mr-4 cursor-pointer">{rating}</span>
                    <span class="mr-4 cursor-pointer">options</span>
                    <span class="mr-4 cursor-default">{date}</span>
        </div>
    )
}
export default ScrobbleRow;