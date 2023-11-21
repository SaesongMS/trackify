import { createEffect, createSignal } from "solid-js";

function Counter(props)
{
    const [title, settitle] = createSignal(null);
    const [count, setcount] = createSignal(null);
    
    createEffect(() => {
        settitle(props.title);
        setcount(props.count);
    }, [props]);
    return(
        <div class="flex flex-col justify-end pr-6">
            <div>{title}</div>
            <div class="font-bold text-lg">{count}</div>
        </div>
    )
}

export default Counter;