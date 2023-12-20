import { createEffect, createSignal } from "solid-js";
import { postData } from "../../../getUserData";


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
        <div class="flex flex-col w-[80%] mt-2 mx-auto">
            <div class="text-2xl font-bold text-center">Stats</div>
            <div class="flex flex-row w-full">
                <div class="flex flex-col w-1/3">
                    <div class="text-xl font-semibold text-center">Scrobbles</div>
                    <div class="text-lg text-center">{scrobleCount().current}</div>
                    <div class="text-xl text-center">Last {interval}: {scrobleCount().previous}</div>
                </div>
                <div class="flex flex-col w-1/3">
                    <div class="text-xl font-semibold text-center">Average Scrobbles</div>
                    <div class="text-lg text-center">{averageScrobleCount().current}</div>
                    <div class="text-xl text-center">Last {interval}: {averageScrobleCount().previous}</div>
                </div>
                <div class="flex flex-col w-1/3">
                    <div class="text-xl font-semibold text-center">Most Active Hour</div>
                    <div class="text-lg text-center">{mostActiveHour().current}</div>
                    <div class="text-xl text-center">Last {interval}: {mostActiveHour().previous}</div>
                </div>
            </div>
        </div>
    )

}

export default Info;