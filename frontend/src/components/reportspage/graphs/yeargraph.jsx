import { createEffect, createSignal } from "solid-js";
import { postData } from "../../../getUserData";

function YearGraph(props){
    const { start, end, userId } = props;
    const previousStart = new Date(new Date(start).setFullYear(new Date(start).getFullYear() - 1));
    const previousEnd = new Date(new Date(end).setFullYear(new Date(end).getFullYear() - 1));
    const [previousData, setPreviousData] = createSignal(null);
    const [data, setData] = createSignal(null);

    const getData = async () => {
        const data = await postData("reports/countByMonth", {
            startdate: start,
            enddate: end,
            userid: userId
        });
        console.log(data.countByMonth);
        setData(data.countByMonth);
    }

    const getPreviousData = async () => {
        const data = await postData("reports/countByMonth", {
            startdate: previousStart,
            enddate: previousEnd,
            userid: userId
        });
        setPreviousData(data.countByMonth);
    }

    createEffect(() => {
        getData();
        getPreviousData();
    });

    return (
        <div class="flex flex-col w-[80%] mt-2 mx-auto">
            <p class="text-2xl font-bold text-center">Scrobbles by Month</p>
            <div class="flex flex-row items-center justify-evenly">
                <div>
                    {data() && data().map((month) => (
                        <div class="flex flex-row">
                            <p class="mr-2">{month.month} {month.year}</p>
                            <p>Count: {month.count}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default YearGraph;