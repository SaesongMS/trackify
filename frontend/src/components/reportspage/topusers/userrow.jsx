function UserRow(props){
    const { user, index } = props;
    
    const handleClick = (event) => {
        event.preventDefault();
        window.location.href = `/user/${user.user.userName}/main`;
    };

    const checkIncrease = () => {
        if(user.rank === 0 || user.previousRank === 0) return "hidden";
        if(user.rank > user.previousRank) return "text-green-500";
        return "hidden";
    }

    const checkDecrease = () => {
        if(user.rank === 0 || user.previousRank === 0) return "hidden";
        if(user.rank < user.previousRank) return "text-red-500";
        return "hidden";
    }
    
    return(
        <div class="justify-center items-center mx-auto">
            <div class="flex flex-row items-center justify-center mx-auto">
                <div class="flex flex-col items-start">
                    <p class={`text-sm ${checkIncrease()}`}>↑</p>
                    <p class="w-8">{index + 1}.</p>
                    <p class={`text-sm ${checkDecrease()}`}>↓</p>
                </div>
                <img
                    onClick={(event) => handleClick(event)}
                    src={`data:image/png;base64,${user.user.avatar}`}
                    alt="cover"
                    class="ml-1 md:ml-2 w-14 h-14 md:w-20 md:h-20 rounded-md cursor-pointer"
                />
                <div class="ml-3 flex flex-col mx-auto">
                    <p
                        onClick={(event) => handleClick(event)}
                        class="mr-2 truncate w-28 sm:w-36 md:w-96 xl:w-56 cursor-pointer text-lg"
                    >
                        {user.user.userName}
                    </p>
                    <p
                        class="mr-2 truncate w-28 sm:w-36 md:w-96 xl:w-56 text-sm"
                    >
                        {user.scrobbleCount} plays
                    </p>
                </div>
            </div>
            <hr class="border-1 border-black opacity-60 h-1 mx-auto my-2"/>
        </div>
    )
}

export default UserRow;