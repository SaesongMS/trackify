import { useParams } from "@solidjs/router";
import { getData, postData } from "../../getUserData";
import { createEffect, createSignal, useContext } from "solid-js";
import UserBaner from "../../components/userpage/userbaner/userbaner";
import { UserContext } from "../../contexts/UserContext";
import Follow from "../../components/userpage/main/follower";
import Belmondo from "../../assets/icons/belmondo.png";
import Card from "../../components/userpage/main/card";

function UserPageFollowers() {
  const params = useParams();
  const [profile, setProfile] = createSignal(null);
  const { user, setUser } = useContext(UserContext);

  createEffect(async () => {
    if (profile() !== null) {
    }
  }, [profile()]);

  createEffect(async () => {
    const userData = await getData(`users/${params.username}`);
    setProfile(userData);
  });

  return (
    <div class="w-[100%] h-[100%] flex flex-col">
      {profile() && (
        <>
          <UserBaner
            avatar={profile().profilePicture}
            username={profile().userName}
            topArtistImage={Belmondo}
            scrobbleCount={profile().scrobbles.length}
            favourites={profile().favouriteSongs.length}
            date={new Date(profile().creation_Date).toLocaleDateString()}
            artistCount={profile().artistCount}
          />
          {profile().favouriteSongs.map((favouriteSong) => (
            <Card
              cover={`data:image/png;base64,${favouriteSong.song.album.cover}`}
              mainText={favouriteSong.song.title}
              secText={favouriteSong.song.album.artist.name}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default UserPageFollowers;
