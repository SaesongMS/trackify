function Avatar(props){
    const { image, ...others } = props;
    return(
        <div class="h-64 w-64 aspect-w-1 aspect-h-1 border border-slate-700">
          <img class="h-[100%] w-[100%]" src={image} />
        </div>
    )
}

export default Avatar;