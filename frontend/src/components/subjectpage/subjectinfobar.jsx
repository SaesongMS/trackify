import Counter from "../userpage/userbanner/counter";
import { createEffect, createSignal } from "solid-js";
function SubjectInfoBar(props){
    const [primaryText, setprimaryText] = createSignal(null);
    const [secondaryText, setsecondaryText] = createSignal(null);
    const [scrobbleCount, setscrobbleCount] = createSignal(null);
    const [usersCount, setusersCount] = createSignal(null);
    const [image, setimage] = createSignal(null);

    createEffect(() => {
        setprimaryText(props.primaryText);
        setsecondaryText(props.secondaryText);
        setscrobbleCount(props.scrobbleCount);
        setusersCount(props.usersCount);
        setimage(props.image);
    }, [props]);
    
    return(
      <div class="h-[100%] bg-no-repeat bg-cover" 
        style={`background-image: url(data:image/png;base64,${image()})`}
      >

        <div class={`h-[100%] flex flex-col md:flex-row w-[100%] bg-black bg-opacity-50 text-slate-200 pb-2 pl-2`}>
            
            <div class="flex flex-col justify-end ml-2">
              <div class="text-[40px] font-bold">{primaryText()}</div>
              <div>{secondaryText()}</div>
            </div>
            <div class="flex ml-2 md:ml-12 md:pl-4">
                <Counter title="Scrobbles" count={scrobbleCount()}/>
                <Counter title="Listeners" count={usersCount()}/>
            </div>
          </div>
      </div>
    )
}
export default SubjectInfoBar;