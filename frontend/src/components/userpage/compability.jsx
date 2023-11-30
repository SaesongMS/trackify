function Compability(props){
    const calcCompability = () => {
        switch (true) {
          case props.compability*100 >= 90:
            return ["Superior", "#7eff80"];
          case props.compability*100 >= 70:
            return ["Great", "#beff7f"];
          case props.compability*100 >= 50:
            return ["Good", "#feff7f"];
          case props.compability*100 >= 30:
            return ["Average", "#ffdf80"];
          case props.compability*100 >= 10:
            return ["Bad", "#ff7f7e"];
          default:
            return ["Horrible", "red"];
        }
    }

    return (
        <div class="flex flex-col">
        <div>
          <span class="text-2xl font-bold">Your compability is</span>
          <span class="text-2xl font-bold ml-2" style={{color: calcCompability()[1]}}>{calcCompability()[0]}</span>
          <span class="text-2xl font-bold ml-2"> - {Math.round(props.compability*100)}%</span>
        </div>
          {props.artists && (
          <div>
            <span class="text-sm">You both listened to</span>
            <a class="text-sm cursor-pointer hover:text-slate-300" href={`/artist/${props.artists[0]}`}> {props.artists[0]}</a>
            <span class="text-sm">, </span>
            <a class="text-sm cursor-pointer hover:text-slate-300" href={`/artist/${props.artists[1]}`}>{props.artists[1]}</a>
            <span class="text-sm"> and </span>
            <a class="text-sm cursor-pointer hover:text-slate-300" href={`/artist/${props.artists[2]}`}>{props.artists[2]}</a>
          </div>
          )}
        </div>
    );
}

export default Compability;