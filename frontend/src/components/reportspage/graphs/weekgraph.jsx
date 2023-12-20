import { createComputed, createEffect, createSignal, onMount } from "solid-js";
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
    const [labels, setLabels] = createSignal([]);
    const [shortLabels, setShortLabels] = createSignal([]);

    onMount(() => {
        Chart.register(Title, Tooltip, Legend, Colors);
    });

    const getData = async () => {
        const data = await postData("reports/countByDay", {
            startdate: start,
            enddate: end,
            userid: userId
        });
        setData(data.countByDay);
        setLabels(data.countByDay.map((day) => day.dayOfWeek));
        setShortLabels(data.countByDay.map((day) => day.dayOfWeek.substring(0, 3)));
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

    const [dataset, setDataset] = createSignal(null);
    createComputed(() => {
        if(!data() || !previousData()) return;
        const d = [];
        if(data().length > 0){
            d.push({
                label: "Current Week",
                data: data().map((day) => day.count),
            },);
        }
        if(previousData().length > 0){
            d.push({
                label: "Previous Week",
                data: previousData().map((day) => day.count),
            });
        }
        setDataset(d);
        console.log(dataset());
    });

    createComputed(() => {
        if(!data() || !previousData()) return;
        setChartData({
            labels:  data().map((day) => day.dayOfWeek),
            datasets: dataset()
        });
    });

    const [isSmallScreen, setIsSmallScreen] = createSignal(window.matchMedia("(max-width: 700px)").matches);
    window.addEventListener("resize", () => {
        setIsSmallScreen(window.matchMedia("(max-width: 700px)").matches);
        console.log(isSmallScreen());
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
        aspectRatio: 2, // This value will make the chart twice as wide as it is tall
        scales: {
            y: {
              ticks: {
                display: !isSmallScreen() // Hide labels on small screens
              }
            },
            x: {
              ticks: {
                display: true, // Always show x-axis labels
                callback: function(value) {
                  // If it's a small screen, return a shorter version of the label
                  return isSmallScreen() ? shortLabels()[value].substring(0, 5) : labels()[value];
                },
                color: "#f2f3ea"
              }
            }
          },
    };

    return (
        <>
            {data() && previousData() &&
                <div class={`lg:w-[80%] lg:mx-auto ${data().length>0 || previousData().length>0 ? "" : "hidden"}`}>
                <Bar data={chartData()} options={options}/>
            </div>}
        </>
    );
}

export default WeekGraph;