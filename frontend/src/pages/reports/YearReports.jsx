import ReportsNavbar from "../../components/reportspage/reportsnavbar";

function YearReports() {
    return (
        <div class="flex flex-col mx-auto w-[80%] bg-[#2b2d31] shadow-xl mt-5 rounded-md text-[#f2f3ea] ">
            <h1 class="text-3xl font-bold">Reports</h1>
            <ReportsNavbar active="year" />
            <div>
            </div>
        </div>
    )
}

export default YearReports;