function ScrobbleRow(props){
    const { albumCover, heart, title, artist, rating, date, ...others } = props;

    return(
        <div class="flex w-[100%] border border-slate-800 pl-3 items-center rounded-sm hover:border-slate-500 transition-all duration-200">
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