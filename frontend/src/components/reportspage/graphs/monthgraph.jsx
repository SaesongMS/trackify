import { createEffect, createSignal, onMount, createComputed } from "solid-js";
import { postData } from "../../../getUserData";
import { Chart, Title, Tooltip, Legend, Colors } from "chart.js";
import { Bar } from "solid-chartjs";

function MonthGraph(props){
    const { start, end, userId } = props;
    const [data, setData] = createSignal(null);
    const [chartData, setChartData] = createSignal(null);

    onMount(() => {
        Chart.register(Title, Tooltip, Legend, Colors);
    });

    const getShortLabel = (start, end) => {
        const startMonth = start.getMonth();
        const endMonth = end.getMonth();
        const startDay = start.getDate();
        const endDay = end.getDate();

        if(startMonth === endMonth){
            return `${startDay} - ${endDay}/${startMonth}`;
        } else {
            return `${startDay}/${startMonth} - ${endDay}/${endMonth}`;
        }
    }

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

    createComputed(() => {
        if(!data()) return;
        setChartData({
            labels:  data().map((week) => getShortLabel(new Date(week.startDate), new Date(week.endDate))),
            datasets: [
                {
                    label: "Current Month",
                    data: data().map((week) => week.count),
                    id: "currentMonth"
                },
            ]
        });
    });

    const [isSmallScreen, setIsSmallScreen] = createSignal(window.matchMedia("(max-width: 700px)").matches);
    window.addEventListener("resize", () => {
        setIsSmallScreen(window.matchMedia("(max-width: 768px)").matches);
    });

    const options = {
        plugins: {
            title: {
                display: true,
                text: "Scrobbles by Week",
                font: {
                    size: 24,
                    weight: "bold",
                },
                color: "#f2f3ea"
            },
            legend: {
                display: false,
                position: "top",
                align: "start",
            }
        },
        responsive: true,
        maintainAspectRatio: false, // This allows the chart to stretch vertically
        aspectRatio: 2, // This value will make the chart twice as wide as it is tall
        scales: {
            y: {
                ticks: {
                    display: false 
                }
            },
            x: {
                ticks: {
                    display: true,
                    maxRotation: isSmallScreen() ? 90 : 0,
                    minRotation: isSmallScreen() ? 90 : 0,
                    color: "#f2f3ea"
                }
            }
        },
    };

    return (
        <>
            {data() && 
            <div class={`w-full lg:w-[80%] lg:mx-auto ${data().length>0 ? "" : "hidden"}`}>
                <Bar data={chartData()} options={options}/>
            </div>}
        </>
    );
}

export default MonthGraph;