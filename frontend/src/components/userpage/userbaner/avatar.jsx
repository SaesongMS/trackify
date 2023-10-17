function Avatar(props){
    const { image, ...others } = props;
    return(
        <div class="h-64 w-64 border border-slate-700">
          <img class="h-[100%] w-[100%]" src={image} />
        </div>
    )
}

export default Avatar;