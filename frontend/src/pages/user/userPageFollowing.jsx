import { useParams } from "@solidjs/router";
import { getData, postData } from "../../getUserData";
import { createEffect, createSignal, useContext } from "solid-js";
import UserBanner from "../../components/userpage/userbanner/userbanner";
import { UserContext } from "../../contexts/UserContext";
import Follow from "../../components/userpage/main/follower";
import Belmondo from "../../assets/icons/belmondo.png";

function UserPageFollowers() {
  const params = useParams();
  const [profile, setProfile] = createSignal(null);
  const { user, setUser } = useContext(UserContext);
  const [followings, setFollowings] = createSignal([]);

  const handleUnfollow = (followedId) => {
    setFollowings(
      followings().filter((following) => following.followed.id !== followedId)
    );
  };

  createEffect(async () => {
    const userData = await getData(`users/${params.username}`);
    setProfile(userData);
    setFollowings(userData.following);
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
          {followings() != null &&
            followings().map((following) => (
              <Follow
                userName={following.followed.userName}
                avatar={following.followed.profilePicture}
                loggedUsername={user() ? user().userName : null}
                profileUsername={profile().userName}
                handleUnfollow={handleUnfollow}
                followedId={following.id_Followed}
              />
            ))}
        </>
      )}
    </div>
  );
}

export default UserPageFollowers;
