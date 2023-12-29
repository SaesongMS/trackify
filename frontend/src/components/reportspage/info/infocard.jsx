import { createComputed, createEffect, createSignal } from "solid-js";

function InfoCard(props){
    const {hidePercentage} = props;
    const [count, setCount] = createSignal(props.count);
    const [prevCount, setPrevCount] = createSignal(props.prevCount);
    const [subject, setSubject] = createSignal(props.subject);
    const [interval, setInterval] = createSignal(props.interval);
    const [percentage, setPercentage] = createSignal(0);

    const calculatePercentage = () => {
        if(count() === 0 || prevCount() === 0) return 0;
        if(count() === null || prevCount() === null) return 0;
        return Math.round((count()  / prevCount()) * 100);
    }
    
    createEffect(() => {
        setCount(props.count);
        setPrevCount(props.prevCount);
        setSubject(props.subject);
        setInterval(props.interval);
    });

    createComputed(() => {
        setPercentage(calculatePercentage());
    });

    const getIncreaseOrDecrease = () =>{
        if(count() === 0 || prevCount() === 0) return "";
        if(count() > prevCount()) return "↑";
        if(count() < prevCount()) return "↓";
        return "";
    }

    const checkIncreaseOrDecrease = () => {
        if(hidePercentage) return "hidden";
        if(count() === 0 || prevCount() === 0) return "hidden";
        if(count() > prevCount()) return "text-green-500";
        if(count() < prevCount()) return "text-red-500";
        return "";
    }

    return(
        <div class="flex flex-col border border-black p-2 mx-2 justify-center items-center">
            <div class="flex flex-col xl:flex-row text-center xl:text-start">
            <p class="text-lg font-bold">{subject()}:</p>
            <p class="text-lg ml-2 font-semibold">{count()}</p>
            </div>
            <div class="flex flex-row">
                <p class="text-sm">vs. {prevCount()} (last {interval()})</p>
                <p class={`ml-1 text-sm ${checkIncreaseOrDecrease()}`}>{percentage()}% {getIncreaseOrDecrease()}</p>
            </div>
        </div>
    )
}

export default InfoCard;