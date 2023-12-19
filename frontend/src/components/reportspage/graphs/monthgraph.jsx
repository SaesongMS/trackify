import { createEffect, createSignal } from "solid-js";
import { postData } from "../../../getUserData";

function MonthGraph(props){
    const { start, end, userId } = props;
    const [data, setData] = createSignal(null);

    const getData = async () => {
        const data = await postData("reports/countByWeek", {
            startdate: start,
            enddate: end,
            userid: userId
        });
        setData(data.countByWeek);
    }

    createEffect(() => {
        getData();
    });

    return (
        <div class="flex flex-col w-[80%] mt-2 mx-auto">
            <p class="text-2xl font-bold text-center">Scrobbles by Week</p>
            <div class="flex flex-row items-center justify-evenly">
                <div>
                    {data() && data().map((day) => (
                        <div class="flex flex-row">
                            <p class="mr-2">{day.startDate} - {day.endDate}</p>
                            <p>Count: {day.count}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MonthGraph;