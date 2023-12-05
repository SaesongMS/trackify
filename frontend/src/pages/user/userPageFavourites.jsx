import { useParams } from "@solidjs/router";
import { getData } from "../../getUserData";
import { createEffect, createSignal, useContext } from "solid-js";
import UserBanner from "../../components/userpage/userbanner/userbanner";
import { UserContext } from "../../contexts/UserContext";
import FavouriteCard from "../../components/userpage/favourites/favourite-card";

function UserPageFollowers() {
  const params = useParams();
  const [profile, setProfile] = createSignal(null);
  const { user } = useContext(UserContext);
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
            scrobbleCount={profile().scrobblesCount}
            favourites={favouriteSongs() ? favouriteSongs().length : 0}
            date={new Date(profile().creation_Date).toLocaleDateString()}
            artistCount={profile().artistCount}
            profileId={profile().id}
            followers={profile().followers}
          />
          <div class="mx-auto p-2 text-[#f2f3ea] max-w-[80%]">
            <h1 class="text-2xl font-bold mb-2">Favourite Songs</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
              {favouriteSongs() != null &&
                favouriteSongs().map((favouriteSong) => (
                  <div class="">
                    <FavouriteCard
                      cover={`data:image/png;base64,${favouriteSong.song.album.cover}`}
                      mainText={favouriteSong.song.title}
                      secText={favouriteSong.song.album.artist.name}
                      profileId={profile().id}
                      handleDelete={handleDeleteFavouriteSong}
                      songId={favouriteSong.song.id}
                      subject="song"
                    />
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserPageFollowers;
