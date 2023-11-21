import { createEffect, createSignal, useContext } from "solid-js";
import { useParams } from "@solidjs/router";
import { UserContext } from "../../../contexts/UserContext";
import { getData, postData } from "../../../getUserData";
import Belmondo from "../../../assets/icons/belmondo.png";
import UserBanner from "../../../components/userpage/userbanner/userbanner";
import ScrobbleRow from "../../../components/userpage/main/scrobbleRow";

function SubjectLibrary() {
  const params = useParams();
  const urlSearch = new URLSearchParams(window.location.search);
  const numberOfRecords = 10;

  const [profile, setProfile] = createSignal(null);
  const { user, setUser } = useContext(UserContext);
  const [subjects, setSubjects] = createSignal(null);
  const [page, setPage] = createSignal(1);
  const [numberOfPages, setNumberOfPages] = createSignal(1);
  const [slicedSubjects, setSlicedSubjects] = createSignal(null);
  const [subject, setSubject] = createSignal(null);

  createEffect(async () => {
    setSubject(params.subject);
  });

  createEffect(async () => {
    if (urlSearch.has("page")) setPage(urlSearch.get("page"));
  });

  createEffect(async () => {
    const userData = await getData(`users/${params.username}`);
    setProfile(userData);
  });

  createEffect(async () => {
    if (profile() !== null) {
      const data = await postData(`scrobbles/top-${subject()}`, {
        id: profile().id,
        Start: profile().creation_Date,
      });
      setSubjects(data[subject()]);
      sliceSubjects();
      setNumberOfPages(Math.ceil(data[subject()].length / numberOfRecords));
    }
  }, [profile()]);

  const sliceSubjects = () => {
    if (subjects() !== null) {
      const start = (page() - 1) * numberOfRecords;
      const end = start + numberOfRecords;
      setSlicedSubjects(subjects().slice(start, end));
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= numberOfPages(); i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((number) => {
      return (
        <a
          class="mx-1"
          href={`/user/${params.username}/library/${subject()}?page=${number}`}
        >
          {number}
        </a>
      );
    });
  };

  const renderSubject = (s) => {
    switch (subject()) {
      case "artists":
        return (
          <div class="flex flex-row text-[#f2f3ea]">
            <ScrobbleRow
              albumCover={s.artist.photo}
              heart="heart"
              title={s.artist.name}
              artist={""}
            />
            <p>Count: {s.count}</p>
          </div>
        );
      case "albums":
        return (
          <div class="flex flex-row">
            <ScrobbleRow
              albumCover={s.album.cover}
              heart="heart"
              title={s.album.name}
              artist={s.album.artist.name}
            />
            <p>Count: {s.count}</p>
          </div>
        );
      case "songs":
        return (
          <div class="flex flex-row">
            <ScrobbleRow
              albumCover={s.song.album.cover}
              heart="heart"
              title={s.song.title}
              artist={s.song.album.artist.name}
            />
            <p>Count: {s.count}</p>
          </div>
        );
    }
  };

  return (
    <div class="w-[100%] h-[100%] overflow-y-auto">
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
          <div class="flex flex-row space-x-5 justify-center text-[#f2f3ea]">
            <a href={`/user/${params.username}/library`}>Scrobbles</a>
            <a href={`/user/${params.username}/library/artists`}>Artists</a>
            <a href={`/user/${params.username}/library/albums`}>Albums</a>
            <a href={`/user/${params.username}/library/songs`}>Songs</a>
          </div>
          <div class="w-[37%] p-6">
            <div class="flex flex-col space-y-2 mt-2">
              {slicedSubjects() != null &&
                slicedSubjects().map((subject) => renderSubject(subject))}
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

export default SubjectLibrary;
