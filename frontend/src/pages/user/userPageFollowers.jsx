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
    console.log(userData.followers);
  });

  return (
    <div class="w-[100%] h-[100%] flex flex-col overflow-hidden">
      {profile() && (
        <>
          <UserBanner
            avatar={profile().profilePicture}
            username={profile().userName}
            topArtistImage={`data:image/png;base64,${profile().topArtistImage}`}
            scrobbleCount={profile().scrobbles.length}
            favourites={profile().favouriteSongs.length}
            date={new Date(profile().creation_Date).toLocaleDateString()}
            artistCount={profile().artistCount}
          />
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {followers() != null &&
              followers().map((follower) => (
                <Follow
                  userName={follower.follower.userName}
                  avatar={follower.follower.profilePicture}
                  bio={follower.follower.bio}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default UserPageFollowers;
