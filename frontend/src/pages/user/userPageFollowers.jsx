import { useParams } from "@solidjs/router";
import { getData } from "../../getUserData";
import { createEffect, createSignal, useContext } from "solid-js";
import UserBanner from "../../components/userpage/userbanner/userbanner";
import { UserContext } from "../../contexts/UserContext";
import Follow from "../../components/userpage/main/follower";
import Belmondo from "../../assets/icons/belmondo.png";

function UserPageFollowers() {
  const params = useParams();
  const [profile, setProfile] = createSignal(null);
  const { user, setUser } = useContext(UserContext);
  const [followers, setFollowers] = createSignal(null);

  createEffect(async () => {
    const userData = await getData(`users/${params.username}`);
    setProfile(userData);
    setFollowers(userData.followers);
  });

  return (
    <div class="w-[100%] h-[100%] flex flex-col">
      {profile() && (
        <>
          <UserBanner
            avatar={profile().profilePicture}
            username={profile().userName}
            topArtistImage={Belmondo}
            scrobbleCount={profile().scrobbles.length}
            favourites={profile().favouriteSongs.length}
            date={new Date(profile().creation_Date).toLocaleDateString()}
            artistCount={profile().artistCount}
          />
          {followers() != null &&
            followers().map((follower) => (
              <Follow
                userName={follower.follower.userName}
                avatar={follower.follower.profilePicture}
              />
            ))}
        </>
      )}
    </div>
  );
}

export default UserPageFollowers;
