import { createEffect, createSignal } from "solid-js";
import { postData } from "../../../getUserData";
import InfoCard from "./infocard";

function Info(props){
    const {start, end, userId, interval } = props;
    const previousStart = new Date(new Date(start).setDate(new Date(start).getDate() - 7));
    const previousEnd = new Date(new Date(end).setDate(new Date(end).getDate() - 7));

    const [scrobleCount, setScrobleCount] = createSignal({current: null, previous: null});
    const [averageScrobleCount, setAverageScrobleCount] = createSignal({current: null, previous: null});
    const [mostActiveHour, setMostActiveHour] = createSignal({current: null, previous: null});

    function formatTime(timeStr) {
        let date = new Date(`1970-01-01T${timeStr}Z`);
        let hours = date.getUTCHours();
        let minutes = date.getUTCMinutes();
    
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
    
        return `${hours}:${minutes}`;
    }

    const getInfo = async (id) => {
        const infoData = await postData("reports/info", {
            startdate: start,
            enddate: end,
            userid: id
        });
        const previousInfoData = await postData("reports/info", {
            startdate: previousStart,
            enddate: previousEnd,
            userid: id
        });

        setScrobleCount({current: infoData.totalScrobbles, previous: previousInfoData.totalScrobbles});
        setAverageScrobleCount({current: infoData.averageScrobblesPerDay, previous: previousInfoData.averageScrobblesPerDay});
        setMostActiveHour({current: formatTime(infoData.mostActiveHour), previous: formatTime(previousInfoData.mostActiveHour)});
    }

    createEffect(() => {
        getInfo(userId);
    });

    return(
        <div class="flex flex-col mt-3">
            <p class="text-2xl font-bold text-center">Stats</p>
            <hr class="border-2 border-slate-300 opacity-30 w-1/2 mx-auto mb-2"/>
            <div class="grid grid-cols-1 md:grid-cols-3 lg:w-[85%] lg:mx-auto">
                <InfoCard subject="Scrobbles" interval={interval} count={scrobleCount().current} prevCount={scrobleCount().previous} />
                <InfoCard subject="Average scrobbles per day" interval={interval} count={averageScrobleCount().current} prevCount={averageScrobleCount().previous} />
                <InfoCard subject="Most Active Hour" interval={interval} count={mostActiveHour().current} prevCount={mostActiveHour().previous} hidePercentage={true} />
            </div>
        </div>
    )

}

export default Info;