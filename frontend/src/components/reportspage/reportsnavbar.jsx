import { A } from "@solidjs/router";

function ReportsNavbar(props){
    return(
        <div class="flex flex-row text-[#f2f3ea] py-2">
            <A href={"/reports/week"} class={`flex h-[100%] justify-center items-center pr-4 ${props.active === "week" ? "underline text-slate-400 [text-shadow:_0_4px_4px_rgb(0_0_0_/_40%)]" : "hover:underline decoration-slate-400"} decoration-4 transition-all duration-150 ease-linear cursor-pointer`}>
                Week
            </A>
            <A href={"/reports/month"} class={`flex h-[100%] justify-center items-center pr-4 ${props.active === "month" ? "underline text-slate-400 [text-shadow:_0_4px_4px_rgb(0_0_0_/_40%)]" : "hover:underline decoration-slate-400"} decoration-4 transition-all duration-150 ease-linear cursor-pointer`}>
                Month
            </A>
            <A href={"/reports/year"} class={`flex h-[100%] justify-center items-center pr-4 ${props.active === "year" ? "underline text-slate-400 [text-shadow:_0_4px_4px_rgb(0_0_0_/_40%)]" : "hover:underline decoration-slate-400"} decoration-4 transition-all duration-150 ease-linear cursor-pointer`}>
                Year
            </A>
        </div>

    )
}

export default ReportsNavbar;