function Comment(props){
    const { avatar, username, comment, date, ...others } = props;
    return(
        <div>
            <div class="flex w-[100%] border border-slate-800 pl-3 items-center rounded-sm hover:border-slate-500 transition-all duration-200">
                <span class="mr-4 cursor-pointer">{avatar}</span>
                <span class="mr-4 cursor-pointer">{username}</span>
                <span class="mr-4 cursor-pointer">{comment}</span>
                <span class="mr-4 cursor-pointer">options</span>
                <span class="mr-4 cursor-default">{date}</span>
            </div>
        </div>
    )
}

export default Comment;