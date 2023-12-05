import {
  createComputed,
  createEffect,
  createSignal,
  useContext,
} from "solid-js";
import { useParams } from "@solidjs/router";
import { UserContext } from "../../../contexts/UserContext";
import { getData, postData } from "../../../getUserData";
import UserBanner from "../../../components/userpage/userbanner/userbanner";
import ScrobbleRow from "../../../components/userpage/main/scrobbleRow";
import arrowUp from "../../../assets/icons/arrow-up.svg";

function ScrobbleLibrary() {
  const params = useParams();

  const [profile, setProfile] = createSignal(null);
  const { user } = useContext(UserContext);
  const [scrobbles, setScrobbles] = createSignal(null);
  const [page, setPage] = createSignal(1);
  const [numberOfPages, setNumberOfPages] = createSignal(1);

  createEffect(async () => {
    const userData = await getData(`users/${params.username}`);
    setProfile(userData);
  });

  const getScrobbles = async () => {
    if (profile() !== null) {
      const data = await postData("scrobbles/interval", {
        id: profile().id,
        Start: profile().creation_Date,
        PageNumber: page(),
      });
      setScrobbles(data.scrobbles);
      setNumberOfPages(data.totalPages);
    }
  };

  createComputed(async () => {
    getScrobbles();
  });

  const isFavouriteSong = (scrobbleRecord) => {
    if (
      user() &&
      scrobbleRecord.song.favouriteSongs &&
      scrobbleRecord.song.favouriteSongs.some(
        (song) => song.id_User === user().id
      )
    )
      return "filledHeart";

    return "heart";
  };

  const handleEditFavouriteSong = (songId, status) => {
    //find scrobbles with songId
    const scrobbleRecords = scrobbles().filter(
      (scrobble) => scrobble.scrobble.song.id === songId
    );
    //update favouriteSongs depending on status - heart or filledHeart
    scrobbleRecords.forEach((scrobbleRecord) => {
      if (status === "heart") {
        scrobbleRecord.scrobble.song.favouriteSongs =
          scrobbleRecord.scrobble.song.favouriteSongs.filter(
            (song) => song.id_User !== user().id
          );
      } else {
        scrobbleRecord.scrobble.song.favouriteSongs.push({
          id_User: user().id,
          id_Song: songId,
        });
      }
    });
    //update array of scrobbles with updated scrobbleRecords
    setScrobbles(
      scrobbles().map((scrobble) => {
        const scrobbleRecord = scrobbleRecords.find(
          (scrobbleRecord) =>
            scrobbleRecord.scrobble.id === scrobble.scrobble.id
        );
        if (scrobbleRecord) return scrobbleRecord;
        return scrobble;
      })
    );
  };

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
            <table class="w-[100%]">
              {scrobbles() != null &&
                scrobbles().map((data) => (
                  <ScrobbleRow
                    albumCover={data.scrobble.song.album.cover}
                    heart={isFavouriteSong(data.scrobble)}
                    title={data.scrobble.song.title}
                    artist={data.scrobble.song.album.artist.name}
                    rating={data.avgRating}
                    date={data.scrobble.scrobble_Date}
                    songId={data.scrobble.song.id}
                    handleEditFavouriteSong={handleEditFavouriteSong}
                    subject="songs"
                  />
                ))}
            </table>
          </div>
          {scrobbles() != null && (
            <div class="flex flex-row justify-center items-center mb-3">
              <button
                class={`text-[#f2f3ea] rounded-md -rotate-90 transform hover:scale-110 transition-all duration-300 ease-in-out ${
                  page() === 1 ? "hidden" : "block"
                }}`}
                onClick={() => {
                  if (page() > 1) setPage(page() - 1);
                }}
              >
                <img class="w-6" src={arrowUp} />
              </button>
              <p class="text-[#f2f3ea] text-2xl mx-3 text-center flex items-center justify-center">
                {page()}
              </p>
              <button
                class="text-[#f2f3ea] rounded-md rotate-90 transform hover:scale-110 transition-all duration-300 ease-in-out"
                onClick={() => {
                  if (page() !== numberOfPages()) setPage(page() + 1);
                }}
              >
                <img class="w-6" src={arrowUp} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ScrobbleLibrary;
