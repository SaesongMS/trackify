import { createEffect, createSignal, useContext } from "solid-js";
import { useParams } from "@solidjs/router";
import { UserContext } from "../../../contexts/UserContext";
import { getData, postData } from "../../../getUserData";
import Belmondo from "../../../assets/icons/belmondo.png";
import UserBanner from "../../../components/userpage/userbanner/userbanner";
import ScrobbleRow from "../../../components/userpage/main/scrobbleRow";

function ScrobbleLibrary() {
  const params = useParams();
  const urlSearch = new URLSearchParams(window.location.search);
  const numberOfRecords = 10;

  const [profile, setProfile] = createSignal(null);
  const { user, setUser } = useContext(UserContext);
  const [scrobbles, setScrobbles] = createSignal(null);
  const [page, setPage] = createSignal(1);
  const [numberOfPages, setNumberOfPages] = createSignal(1);
  const [slicedScrobbles, setSlicedScrobbles] = createSignal(null);

  createEffect(async () => {
    if (urlSearch.has("page")) setPage(urlSearch.get("page"));
  });

  createEffect(async () => {
    const userData = await getData(`users/${params.username}`);
    setProfile(userData);
  });

  createEffect(async () => {
    if (profile() !== null) {
      const data = await postData("scrobbles/interval", {
        id: profile().id,
        Start: profile().creation_Date,
      });
      setScrobbles(data.scrobbles);
      sliceScrobbles();
      setNumberOfPages(Math.ceil(data.scrobbles.length / numberOfRecords));
    }
  }, [profile()]);

  const sliceScrobbles = () => {
    if (scrobbles() !== null) {
      const start = (page() - 1) * numberOfRecords;
      const end = start + numberOfRecords;
      setSlicedScrobbles(scrobbles().slice(start, end));
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= numberOfPages(); i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((number) => {
      return (
          <a class={`mx-1 ${number == page() ? "underline" : ""}`} href={`/user/${params.username}/library/?page=${number}`}>
            {number}
          </a>
      );
    });
  };

  return (
    <div class="w-[100%] h-[100%] overflow-y-auto">
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
          <div class="flex flex-row space-x-5 justify-center text-[#f2f3ea]">
            <a href={`/user/${params.username}/library`}>Scrobbles</a>
            <a href={`/user/${params.username}/library/artists`}>Artists</a>
            <a href={`/user/${params.username}/library/albums`}>Albums</a>
            <a href={`/user/${params.username}/library/songs`}>Songs</a>
          </div>
          <div class="w-[37%] p-6">
            <div class="flex flex-col space-y-2 mt-2">
              {slicedScrobbles() != null &&
                slicedScrobbles().map((scrobble) => (
                  <ScrobbleRow
                    albumCover={scrobble.song.album.cover}
                    heart="heart"
                    title={scrobble.song.title}
                    artist={scrobble.song.album.artist.name}
                    rating="5/5"
                    date={scrobble.scrobble_Date}
                  />
                ))}
            </div>
          </div>
          <div class="flex flex-row justify-center items-center mb-3">
            {numberOfPages() > 1 && renderPageNumbers()}
          </div>
        </>
      )}
    </div>
  );
}

export default ScrobbleLibrary;
