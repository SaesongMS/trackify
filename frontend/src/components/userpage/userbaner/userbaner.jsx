import { A } from "@solidjs/router";
import Avatar from "./avatar";
import ProfileNav from "./profilenav";
import InfoBar from "./infobar";
import AppLogo from "../../../assets/icons/logo.png";

function UserBaner(){
    return(
        <div class="flex w-[100%]">
            <Avatar image={AppLogo} />
            <div class="flex flex-col h-[100%] flex-grow">
                <InfoBar username="JanPawlakTheSecond" date="02.04.2005"/>
                <ProfileNav />
            </div>
        </div>
    )
}

export default UserBaner;