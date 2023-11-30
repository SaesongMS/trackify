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
        <div class="flex flex-row lg:flex-col items-center lg:items-start justify-start md:justify-end pr-6">
            <div>{title}</div>
            <div class="ml-3 lg:ml-0 font-bold text-lg">{count}</div>
        </div>
    )
}

export default Counter;