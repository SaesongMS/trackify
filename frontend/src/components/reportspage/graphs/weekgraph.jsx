import { createComputed, createEffect, createSignal, on, onMount } from "solid-js";
import { postData } from "../../../getUserData";
import { Chart, Title, Tooltip, Legend, Colors } from "chart.js";
import { Bar } from "solid-chartjs";

function WeekGraph(props){
    const { start, end, userId } = props;
    const previousStart = new Date(new Date(start).setDate(new Date(start).getDate() - 7));
    const previousEnd = new Date(new Date(end).setDate(new Date(end).getDate() - 7));
    const [data, setData] = createSignal(null);
    const [previousData, setPreviousData] = createSignal(null);
    const [chartData, setChartData] = createSignal(null);

    onMount(() => {
        Chart.register(Title, Tooltip, Legend, Colors);
    });

    const getData = async () => {
        const data = await postData("reports/countByDay", {
            startdate: start,
            enddate: end,
            userid: userId
        });
        console.log(data.countByDay);
        setData(data.countByDay);
    }

    const getPreviousData = async () => {
        const data = await postData("reports/countByDay", {
            startdate: previousStart,
            enddate: previousEnd,
            userid: userId
        });
        setPreviousData(data.countByDay);
    }

    createEffect(() => {
        getData();
        getPreviousData();
    });

    const updateChartData = (d, pd) => {
        if(!d || !pd) return;
        setChartData({
            labels:  d.map((day) => day.dayOfWeek),
            datasets: [
                {
                    label: "Current Week",
                    data: d.map((day) => day.count),
                },
                {
                    label: "Previous Week",
                    data: pd.map((day) => day.count),
                }
            ]
        });
    }

    createComputed(() => {
        updateChartData(data(), previousData());
    });

    const options = {
        plugins: {
            title: {
                display: true,
                text: "Scrobbles by Day",
                font: {
                    size: 24,
                    weight: "bold",
                },
                color: "#f2f3ea"
            },
            legend: {
                display: true,
                position: "top",
                align: "start",
            }
        },
        responsive: true,
        maintainAspectRatio: false, // This allows the chart to stretch vertically
        aspectRatio: 2 // This value will make the chart twice as wide as it is tall
    };

    return (
        <>
            <div class="flex flex-col w-[80%] mt-2 mx-auto">
                {/* <div class="flex flex-row items-center justify-evenly">
                    <div>
                        <p class="text-xl font-semibold text-center">Current Week</p>
                        {data() && data().map((day) => (
                            <div class="flex flex-row">
                                <p class="mr-2">Date: {day.date}, {day.dayOfWeek}</p>
                                <p>Count: {day.count}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <p class="text-xl font-semibold text-center">Previous Week</p>
                        {previousData() && previousData().map((day) => (
                            <div class="flex flex-row">
                                <p class="mr-2">Date: {day.date}, {day.dayOfWeek}</p>
                                <p>Count: {day.count}</p>
                            </div>  
                        ))}
                    </div>
                </div> */}
            </div>
            <div class="w-[80%] mx-auto">
                <Bar data={chartData()} options={options}/>
            </div>
        </>
    );
}

export default WeekGraph;