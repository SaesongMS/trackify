import { useParams } from "@solidjs/router";
import { getData, postData } from "../../getUserData";
import {
  createEffect,
  createResource,
  createSignal,
  onCleanup,
  useContext,
} from "solid-js";
import UserBaner from "../../components/userpage/userbaner/userbaner";
import MainPage from "../../components/userpage/main/mainpage";
import AppLogo from "../../assets/icons/logo.png";
import Belmondo from "../../assets/icons/belmondo.png";
import { UserContext } from "../../contexts/UserContext";
function UserPageMain() {
  const params = useParams();
  const [profile, setProfile] = createSignal(null);
  const [songs, setSongs] = createSignal(null);
  const [artists, setArtists] = createSignal(null);
  const [albums, setAlbums] = createSignal(null);
  const {user, setUser} = useContext(UserContext);

  // let user = null, songs;

  // [user] = createResource(`users/${params.username}`, getData);

  createEffect(async () => {
    if (profile() !== null) {
      const albumsData = await postData("scrobbles/top-n-albums", {
        n: 8,
        id: profile().id,
      });
      setAlbums(albumsData.topAlbums);

      const songsData = await postData("scrobbles/top-n-songs", {
        n: 8,
        id: profile().id,
      });
      setSongs(songsData.topSongs);

      const artistsData = await postData("scrobbles/top-n-artists", {
        n: 8,
        id: profile().id,
      });
      setArtists(artistsData.topArtists);
    }
  }, [profile()]);

  createEffect(async () => {
    const userData = await getData(`users/${params.username}`);
    setProfile(userData);
  });

  function formatTimeDifference(scrobbleDate) {
    const currentDate = new Date();
    const scrobbleDateObject = new Date(scrobbleDate);

    const timeDifference = currentDate - scrobbleDateObject;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day(s) ago`;
    } else if (hours > 0) {
      return `${hours} hour(s) ago`;
    } else if (minutes > 0) {
      return `${minutes} minute(s) ago`;
    } else {
      return `${seconds} second(s) ago`;
    }
  }

  return (
    <div class="w-[100%] h-[100%] flex flex-col">
      {profile() && songs() && artists() && albums() && (
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
          <MainPage
            scrobbles={profile().scrobbles}
            comments={profile().profileComments}
            topArtists={artists()}
            topAlbums={albums()}
            topSongs={songs()}
            loggedUser={user()}
            profileId={profile().id}
          />
        </>
      )}

      {/* {user() && (
        <div>
          <h2 class="font-bold mt-2">User Information</h2>
          <p>userName: {user().userName}</p>
          <p>description: {user().description}</p>
          <p>Profile picture:</p>
          <img
            src={`data:image/png;base64,${user().profilePicture}`}
            alt="profile picture"
            class="max-w-[150px]"
          />
          <p>Followers: {user().followers.length}</p>
          <p>Following: {user().following.length}</p>
          {user().profileComments.length > 0 && (
            <div>
              <h2 class="font-bold mt-2">Profile Comments</h2>
              {user().profileComments.map((comment) => (
                <div>
                  <div class="flex">
                    By:
                    <img
                      src={`data:image/png;base64,${comment.sender.avatar}`}
                      alt="profile picture"
                      class="max-w-[50px]"
                    />
                    {comment.sender.userName}
                  </div>
                  <p>Comment: {comment.comment}</p>
                  <p>
                    Date:{" "}
                    {Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                      timeZone: "UTC",
                    }).format(new Date(comment.creation_Date))}
                  </p>
                </div>
              ))}
            </div>
          )}
          <div>
            <h2 class="font-bold mt-2">Scrobbles</h2>
            {user().scrobbles.length > 0 &&
              user().scrobbles.map((scrobble) => (
                <div>
                  <p>
                    Cover:
                    <img
                      src={`data:image/png;base64,${scrobble.song.album.cover}`}
                      alt="cover picture"
                      class="max-w-[100px]"
                    />
                  </p>
                  <p>Title of the song: {scrobble.song.title}</p>
                  <p>Artist: {scrobble.song.album.artist.name}</p>
                  <p>
                    Listened: {formatTimeDifference(scrobble.scrobble_Date)}
                  </p>
                </div>
              ))}
            {!user().scrobbles.length > 0 && <p>No scrobbles yet</p>}
          </div>
        </div>
      )}
      <span class="font-bold mt-2">Rated by user artists:</span>
      {user() != null &&
        user().ratedArtists.length > 0 &&
        user().ratedArtists.map((artist) => (
          <div>
            <p>Artist: {artist.artist.name}</p>
            <p>Rating: {artist.rating}</p>
            <p>
              Photo:{" "}
              <img
                src={`data:image/png,base64,${artist.artist.photo}`}
                alt="artist photo"
                class="max-w-[100px]"
              />
            </p>
          </div>
        ))}
      <span class="font-bold mt-2">Rated by user albums:</span>
      {user() != null &&
        user().ratedAlbums.length > 0 &&
        user().ratedAlbums.map((album) => (
          <div>
            <p>Album: {album.album.name}</p>
            <p>Rating: {album.rating}</p>
            <p>
              Cover:{" "}
              <img
                src={`data:image/png,base64,${album.album.cover}`}
                alt="cover picture"
                class="max-w-[100px]"
              />
            </p>
          </div>
        ))}
      <span class="font-bold mt-2">Rated by user songs:</span>
      {user() != null &&
        user().ratedSongs.length > 0 &&
        user().ratedSongs.map((song) => (
          <div>
            <p>Song: {song.song.title}</p>
            <p>Rating: {song.rating}</p>
            <p>
              Cover:{" "}
              <img
                src={`data:image/png,base64,${song.song.album.cover}`}
                alt="cover picture"
                class="max-w-[100px]"
              />
            </p>
          </div>
        ))}
      <span class="font-bold mt-2">Favorite user's songs:</span>
      {user() != null &&
        user().favouriteSongs.length > 0 &&
        user().favouriteSongs.map((song) => (
          <div>
            <p>Song: {song.song.title}</p>
            <p>Cover: {song.song.album.cover}</p>
          </div>
        ))} */}
    </div>
  );
}

export default UserPageMain;
