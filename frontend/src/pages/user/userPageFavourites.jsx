import { useParams } from "@solidjs/router";
import { getData, postData } from "../../getUserData";
import { createEffect, createSignal, useContext } from "solid-js";
import UserBanner from "../../components/userpage/userbanner/userbanner";
import { UserContext } from "../../contexts/UserContext";
import Belmondo from "../../assets/icons/belmondo.png";
import Card from "../../components/userpage/main/card";

function UserPageFollowers() {
  const params = useParams();
  const [profile, setProfile] = createSignal(null);
  const { user, setUser } = useContext(UserContext);
  const [favouriteSongs, setFavouriteSongs] = createSignal(null);

  const handleDeleteFavouriteSong = (songId) => {
    setFavouriteSongs(
      favouriteSongs().filter(
        (favouriteSong) => favouriteSong.song.id !== songId
      )
    );
  };

  const getUserData = async () => {
    const userData = await getData(`users/${params.username}`);
    setProfile(userData);
    setFavouriteSongs(userData.favouriteSongs);
    console.log(userData.favouriteSongs);
  };

  createEffect(() => {
    getUserData();
  });

  createEffect(() => {
    if (favouriteSongs() !== null) setFavouriteSongs(profile().favouriteSongs);
  });

  return (
    <div class="w-[100%] h-[100%] flex flex-col overflow-auto">
      {profile() && (
        <>
          <UserBanner
            avatar={profile().profilePicture}
            username={profile().userName}
            topArtistImage={`data:image/png;base64,${profile().topArtistImage}`}
            scrobbleCount={profile().scrobbles.length}
            favourites={favouriteSongs() ? favouriteSongs().length : 0}
            date={new Date(profile().creation_Date).toLocaleDateString()}
            artistCount={profile().artistCount}
            profileId={profile().id}
            followers={profile().followers}
          />
          <div class="grid grid-rows-4">
            {favouriteSongs() != null &&
              favouriteSongs().map((favouriteSong) => (
                <div class="w-[20%]">
                  <Card
                    cover={`data:image/png;base64,${favouriteSong.song.album.cover}`}
                    mainText={favouriteSong.song.title}
                    secText={favouriteSong.song.album.artist.name}
                    loggedUserId={user() ? user().id : null}
                    profileId={profile().id}
                    handleDelete={handleDeleteFavouriteSong}
                    songId={favouriteSong.song.id}
                    subject="song"
                  />
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default UserPageFollowers;
