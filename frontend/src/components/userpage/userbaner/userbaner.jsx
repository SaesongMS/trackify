import { A } from "@solidjs/router";
import Avatar from "./avatar";
import ProfileNav from "./profilenav";
import InfoBar from "./infobar";

function UserBaner(props) {
  const { topArtistImage, ...others } = props;
  return (
    <div class="flex w-[100%] h-[20%]">
      <Avatar image={props.avatar} />
      <div class="flex flex-col h-[100%] flex-grow">
        <InfoBar
          topArtistImage={topArtistImage}
          username={props.username}
          date={props.date}
          trackCount={props.scrobbleCount}
          artistCount={props.artistCount}
          songsCount={props.favourites}
        />
        <ProfileNav username={props.username} />
      </div>
    </div>
  );
}

export default UserBaner;
