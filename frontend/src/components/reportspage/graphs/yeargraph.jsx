import { createComputed, createEffect, createSignal, onMount } from "solid-js";
import { postData } from "../../../getUserData";
import { Chart, Title, Tooltip, Legend, Colors } from "chart.js";
import { Bar } from "solid-chartjs";

function YearGraph(props){
    const { start, end, userId } = props;
    const previousStart = new Date(new Date(start).setFullYear(new Date(start).getFullYear() - 1));
    const previousEnd = new Date(new Date(end).setFullYear(new Date(end).getFullYear() - 1));
    const [previousData, setPreviousData] = createSignal(null);
    const [data, setData] = createSignal(null);
    const [chartData, setChartData] = createSignal(null);
    const [labels, setLabels] = createSignal(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November",  "December"]);
    const [shortLabels, setShortLabels] = createSignal(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct",  "Nov", "Dec"]);

    onMount(() => {
        Chart.register(Title, Tooltip, Legend, Colors);
    });

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
        console.log(data.countByMonth);
        setPreviousData(data.countByMonth);

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
                label: "Current Year",
                data: data().map((month) => month.count),
            });
        }
        if(previousData().length > 0){
            d.push({
                label: "Previous Year",
                data: previousData().map((month) => month.count),
            });
        }
        setDataset(d);
        console.log(dataset());
    });

    createComputed(() => {
        if(!data() || !previousData()) return;
        setChartData({
            labels:  data().map((month) => labels()[month.month-1]),
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
                text: "Scrobbles by Month",
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
                    return isSmallScreen() ? shortLabels()[data()[value].month-1] : labels()[data()[value].month-1];
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

export default YearGraph;