import { useParams } from "@solidjs/router";
import { getData, postData } from "../../getUserData";
import { createComputed, createEffect, createSignal, useContext } from "solid-js";
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
  const [compability, setCompability] = createSignal({compability: -1, artists: ["", "", ""]});

  const getProfile = async () => {
    const userData = await getData(`users/${params.username}`);
    setProfile(userData);
    console.log(userData);
  };

  createEffect(() => {
    getProfile();
  });

  const getAlbums = async () => {
    if(!profile()) return;
    const albumsData = await postData("scrobbles/top-n-albums", {
      n: 8,
      id: profile().id,
    });
    setAlbums(albumsData.albums);
  };

  const getArtists = async () => {
    if(!profile()) return;
    const artistsData = await postData("scrobbles/top-n-artists", {
      n: 8,
      id: profile().id,
    });
    setArtists(artistsData.artists);
  };

  const getSongs = async () => {
    if(!profile()) return;
    const songsData = await postData("scrobbles/top-n-songs", {
      n: 8,
      id: profile().id,
    });
    setSongs(songsData.songs);
  }

  createEffect(() => {
      getAlbums();
      getArtists();
      getSongs();
  });

  createComputed(async () => {
    if(user() !== null && profile() !== null){
      if(user().id !== profile().id){
        const compabilityData = await getData(`users/compability/?user_id=${profile().id}`);
        console.log(compabilityData);
        setCompability(compabilityData);
        console.log(compability());
      }
    }
  });

  return (
    <div class="h-[100%] flex flex-col">
      {profile() && songs() && artists() && albums() && compability() &&  (
        <>
          <UserBanner
            avatar={profile().profilePicture}
            username={profile().userName}
            topArtistImage={`data:image/png;base64,${profile().topArtistImage}`}
            scrobbleCount={profile().scrobblesCount}
            favourites={profile().favouriteSongs.length}
            date={new Date(profile().creation_Date).toLocaleDateString()}
            artistCount={profile().artistCount}
            profileId={profile().id}
            userId={user() ? user().id : null}
            compability={compability().compability}
            compabilityArtist={compability().artists}
          />
          <MainPage
            scrobbles={
              profile().scrobbles.length > 0
                ? profile().scrobbles
                : mockScrobbles
            }
            comments={profile().profileComments}
            topArtists={artists()}
            topAlbums={albums()}
            topSongs={songs()}
            loggedUser={user() ? user() : null}
            profileId={profile().id}
            bio={profile().description}
            compability={compability().compability}
            compabilityArtist={compability().artists}
          />
        </>
      )}
    </div>
  );
}

export default UserPageMain;
