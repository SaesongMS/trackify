import { createComputed, createEffect, createSignal } from "solid-js";
import { postData } from "../../../getUserData";
import UserRow from "./userrow";

function TopUsers(props){
    const {start, end, previousStart, previousEnd, userId, interval } = props;
    const [topUsers, setTopUsers] = createSignal(null);
    const [place, setPlace] = createSignal(null);
    const [previousPlace, setPreviousPlace] = createSignal(null);

    const getTopUsers = async (id) => {
        const topUsersData = await postData("reports/topUsers", {
            startdate: start,
            enddate: end,
            userid: id,
            previousstartdate: previousStart,
            previousenddate: previousEnd
        });
        setTopUsers(topUsersData.topUsers);
    }

    createEffect(() => {
        getTopUsers(userId);
    });

    createComputed(() => {
        if(!topUsers()) return;
        const user = topUsers().find(u => u.user.id === userId);
        const rank = user.rank;
        const previousRank = user.previousRank;
        setPlace(rank);
        setPreviousPlace(previousRank);
    });

    const getIncreaseOrDecrease = () =>{
        const change = place() - previousPlace();
        if(place() > previousPlace()) return `↑${change}`;
        if(place() < previousPlace()) return `↓${change}`;
        return "";
    }

    const checkIncreaseOrDecrease = () => {
        if(place() === 0 || previousPlace() === 0) return "hidden";
        if(place() > previousPlace()) return "text-green-500";
        if(place() < previousPlace()) return "text-red-500";
        return "";
    }

    //return table with top users and their count
    return(
        <div class="flex flex-col mt-3">
            <p class="text-2xl font-bold text-center">Top Users</p>
            <hr class="border-2 border-slate-300 opacity-30 w-1/2 mx-auto mb-2"/>
            <div class="flex flex-col mx-auto">
                <p class="text-center text-md opacity-30">Most Plays</p>
                {place() !== 0 && <p class="text-center text-lg font-bold">{place()}. place</p>}
                {previousPlace() !== 0 &&<div class="flex flex-row justify-center">
                    <p class="text-md">vs. {previousPlace()}. place (last {interval})</p>
                    <p class={`ml-1 text-md ${checkIncreaseOrDecrease()}`}>{getIncreaseOrDecrease()}</p>
                </div>}
                <div class="flex flex-col mt-2">
                    {topUsers() && topUsers().map((user, index) => {
                        return(
                            <UserRow user={user} index={index} />
                        )
                    })}
                </div>
            </div>
        </div>
    )

}

export default TopUsers;