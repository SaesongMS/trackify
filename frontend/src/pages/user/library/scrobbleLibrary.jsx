import { createComputed, createEffect, createSignal, useContext } from "solid-js";
import { useParams } from "@solidjs/router";
import { UserContext } from "../../../contexts/UserContext";
import { getData, postData } from "../../../getUserData";
import Belmondo from "../../../assets/icons/belmondo.png";
import UserBanner from "../../../components/userpage/userbanner/userbanner";
import ScrobbleRow from "../../../components/userpage/main/scrobbleRow";
import arrowUp from "../../../assets/icons/arrow-up.svg";

function ScrobbleLibrary() {
  const params = useParams();
  const urlSearch = new URLSearchParams(window.location.search);
  const numberOfRecords = 10;

  const [profile, setProfile] = createSignal(null);
  const { user, setUser } = useContext(UserContext);
  const [scrobbles, setScrobbles] = createSignal(null);
  const [page, setPage] = createSignal(1);

  createEffect(async () => {
    if (urlSearch.has("page")) 
      setPage(urlSearch.get("page"));
    console.log(page());
  });

  createEffect(async () => {
    const userData = await getData(`users/${params.username}`);
    setProfile(userData);
  });

  const getScrobbles = async (pageNum) => {
    if (profile() !== null) {
      const data = await postData("scrobbles/interval", {
        id: profile().id,
        Start: profile().creation_Date,
        PageNumber: pageNum,
      });
      setScrobbles(data.scrobbles);
    }
  };

  createComputed(async () => {
    getScrobbles(page());
  });

  return (
    <div class="w-[100%] h-[100%] overflow-y-auto text-[#f2f3ea]">
      {profile() && (
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
            followers={profile().followers}
          />
          <div class="flex flex-row space-x-5 justify-center text-[#f2f3ea]">
            <a href={`/user/${params.username}/library`}>Scrobbles</a>
            <a href={`/user/${params.username}/library/artists`}>Artists</a>
            <a href={`/user/${params.username}/library/albums`}>Albums</a>
            <a href={`/user/${params.username}/library/songs`}>Songs</a>
          </div>
          <div class="w-[80%] p-6 flex justify-center mx-auto">
            <table>
              {scrobbles() != null &&
                scrobbles().map((data) => (
                  <ScrobbleRow
                    albumCover={data.scrobble.song.album.cover}
                    heart="heart"
                    title={data.scrobble.song.title}
                    artist={data.scrobble.song.album.artist.name}
                    rating={data.avgRating}
                    date={data.scrobble.scrobble_Date}
                  />
                ))}
            </table>
          </div>
          {scrobbles() != null &&  (
          <div class="flex flex-row justify-center items-center mb-3">
            <button
              class={`text-[#f2f3ea] rounded-md -rotate-90 transform hover:scale-110 transition-all duration-300 ease-in-out ${page() === 1 ? "hidden" : "block"}}`}
              onClick={() => {
                if (page() > 1) setPage(page() - 1);
              }}
            >
              <img
                class="w-6" 
                src={arrowUp} />
            </button>
            <p class="text-[#f2f3ea] text-2xl mx-3 text-center flex items-center justify-center">{page()}</p>
            <button
              class="text-[#f2f3ea] rounded-md rotate-90 transform hover:scale-110 transition-all duration-300 ease-in-out"
              onClick={() => {
                setPage(page() + 1);
              }}
            >
              <img
                class="w-6"  
                src={arrowUp} />
            </button>
          </div>)}
        </>
      )}
    </div>
  );
}

export default ScrobbleLibrary;
