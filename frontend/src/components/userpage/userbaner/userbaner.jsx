import { A } from "@solidjs/router";
import Avatar from "./avatar";
import ProfileNav from "./profilenav";
import InfoBar from "./infobar";

function UserBaner(props){
    const { avatar, topArtistImage, ...others } = props;
    return(
        <div class="flex w-[100%] h-[20%]">
            <Avatar image={avatar} />
            <div class="flex flex-col h-[100%] flex-grow">
                <InfoBar topArtistImage={topArtistImage} username="JanPawlakTheSecond" date="02.04.2005" trackCount="2137" artistCount="1337" songsCount="1234"/>
                <ProfileNav />
            </div>
        </div>
    )
}

export default UserBaner;