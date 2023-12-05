import { A } from "@solidjs/router";
import Avatar from "./avatar";
import ProfileNav from "./profilenav";
import InfoBar from "./infobar";

function UserBanner(props) {
  const { topArtistImage, ...others } = props;
  console.log(props);
  return (
    <div class="flex w-[100%] h-[20%]">
      <Avatar
        image={props.avatar}
        profileId={props.profileId}
        userId={props.userId}
      />
      <div class="flex flex-col flex-grow">
        <InfoBar
          topArtistImage={props.topArtistImage}
          username={props.username}
          date={props.date}
          trackCount={props.scrobbleCount}
          artistCount={props.artistCount}
          songsCount={props.favourites}
          compability={props.compability}
          compabilityArtist={props.compabilityArtist}
        />
        <ProfileNav username={props.username} />
      </div>
    </div>
  );
}

export default UserBanner;
