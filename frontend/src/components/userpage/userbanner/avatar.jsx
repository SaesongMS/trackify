function Avatar(props){
    return(
        <div class="h-[100%] aspect-square border border-[#3f4147]">
          <img class="h-[100%] w-[100%]" src={`data:image/png;base64,${props.image}`}/>
        </div>
    )
}

export default Avatar;