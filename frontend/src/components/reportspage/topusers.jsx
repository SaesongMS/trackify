import { createEffect, createSignal } from "solid-js";
import { postData } from "../../getUserData";

function TopUsers(props){
    const {start, end, userId } = props;
    const [topUsers, setTopUsers] = createSignal(null);

    const getTopUsers = async (id) => {
        const topUsersData = await postData("reports/topUsers", {
            startdate: start,
            enddate: end,
            userid: id,
        });
        setTopUsers(topUsersData.topUsers);
    }

    createEffect(() => {
        getTopUsers(userId);
    });

    //return table with top users and their count
    return(
        <div class="flex flex-col w-[80%] mt-2 mx-auto">
            <div class="text-2xl font-bold text-center">Top Users</div>
            <div class="flex flex-row w-full">
                <div class="flex flex-col w-full">
                    <div class="text-xl text-center">Users</div>
                    <div class="text-xl text-center">Count</div>
                </div>
                {topUsers() && topUsers().map((user) => (
                    <div class="flex flex-col w-full">
                        <div class="text-lg text-center">{user.user.userName}</div>
                        <div class="text-lg text-center">{user.scrobbleCount}</div>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default TopUsers;