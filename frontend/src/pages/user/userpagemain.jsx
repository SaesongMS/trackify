import { useParams } from "@solidjs/router";
import { getData, postData } from "../../getUserData";
import { createEffect, createSignal, useContext } from "solid-js";
import UserBanner from "../../components/userpage/userbanner/userbanner";
import MainPage from "../../components/userpage/main/mainpage";
import Belmondo from "../../assets/icons/belmondo.png";
import { UserContext } from "../../contexts/UserContext";

function UserPageMain() {
  const params = useParams();
  const [profile, setProfile] = createSignal(null);
  const [songs, setSongs] = createSignal(null);
  const [artists, setArtists] = createSignal(null);
  const [albums, setAlbums] = createSignal(null);
  const { user, setUser } = useContext(UserContext);

  createEffect(async () => {
    if (profile() !== null) {
      const albumsData = await postData("scrobbles/top-n-albums", {
        n: 8,
        id: profile().id,
      });
      setAlbums(albumsData.albums);

      const songsData = await postData("scrobbles/top-n-songs", {
        n: 8,
        id: profile().id,
      });
      setSongs(songsData.songs);

      const artistsData = await postData("scrobbles/top-n-artists", {
        n: 8,
        id: profile().id,
      });
      setArtists(artistsData.artists);
    }
  }, [profile()]);

  createEffect(async () => {
    const userData = await getData(`users/${params.username}`);
    setProfile(userData);
  });

  return (
    <div class="h-[100%] flex flex-col">
      {profile() && songs() && artists() && albums() && (
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
          <MainPage
            scrobbles={profile().scrobbles}
            comments={profile().profileComments}
            topArtists={artists()}
            topAlbums={albums()}
            topSongs={songs()}
            loggedUser={user() ? user() : null}
            profileId={profile().id}
          />
        </>
      )}
    </div>
  );
}

export default UserPageMain;
