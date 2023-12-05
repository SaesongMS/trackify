import { A } from "@solidjs/router";
import heartIcon from "../../../assets/icons/heart.svg";
import filledHeart from "../../../assets/icons/filledHeart.svg";
import Belmondo from "../../../assets/icons/belmondoblur.png";
import { createSignal, createEffect } from "solid-js";
import { deleteData, postData } from "../../../getUserData";
import { encodeSubjectName } from "../../../encodeSubjectName";

function ScrobbleRow(props) {
  const { title, artist, rating, date, album, songId, subject, ...others } =
    props;
  const [heart, setHeart] = createSignal(props.heart);
  const [albumCover, setAlbumCover] = createSignal(null);

  const handleEditFavouriteSong = async () => {
    if (!songId) return;
    if (props.heart === "heart") {
      postData("favourite-song/create", {
        songId: songId,
      });
      setHeart("filledHeart");
    } else {
      deleteData("favourite-song/delete", {
        songId: songId,
      });
      setHeart("heart");
    }
    if (props.handleEditFavouriteSong)
      props.handleEditFavouriteSong(songId, heart());
  };

  createEffect(() => {
    if (props.albumCover.length !== 0)
      setAlbumCover(`data:image/png;base64,${props.albumCover}`);
    else setAlbumCover(Belmondo);
  }, [props.albumCover]);

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

  const redirectToSubjectPage = (e) => {
    e.preventDefault();
    if (subject == "songs")
      window.location.href = `/song/${encodeSubjectName(title)}`;
    else if (subject == "albums")
      window.location.href = `/album/${encodeSubjectName(title)}`;
    else if (subject == "artists")
      window.location.href = `/artist/${encodeSubjectName(title)}`;
  };

  const returnAnchorForSubject = () => {
    if (subject == "songs")
      return (
        <A
          href={`/song/${encodeSubjectName(title)}`}
          class="hover:text-slate-300"
        >
          {title}
        </A>
      );
    else if (subject == "albums")
      return (
        <A
          href={`/album/${encodeSubjectName(title)}`}
          class="hover:text-slate-300"
        >
          {title}
        </A>
      );
    else if (subject == "artists")
      return (
        <A
          href={`/artist/${encodeSubjectName(title)}`}
          class="hover:text-slate-300"
        >
          {title}
        </A>
      );
  };

  if (title === "Your scrobbles")
    return (
      <tr class="border border-black">
        <td class="w-1/12">
          <img
            class="mr-4 cursor-pointer max-w-[10%] hover:opacity-80 transition-all duration-150"
            src={albumCover()}
          />
        </td>
        <td class="w-1/24 text-center">
          <img src={heartIcon} class="w-4" />
        </td>
        <td class="w-4/12 lg:max-w-[200px] md:max-w-[100px] sm:max-w-[60px] truncate">
          {title}
        </td>
        <td class="w-4/12 lg:max-w-[200px] md:max-w-[100px] sm:max-w-[60px] truncate">
          {artist}
        </td>
        <td class="w-1/24 text-center text-yellow-400">{`5/5 \u2605`}</td>
        <td class="w-1/8 text-center">
          {date ? formatTimeDifference(date) : ""}
        </td>
        <td class="w-1/24 text-center text-red-500 font-bold">X</td>
      </tr>
    );
  return (
    <tr class="border border-black">
      <td class="w-1/12">
        <img
          class="mr-4 cursor-pointer hover:opacity-80 transition-all duration-150 object-cover aspect-square"
          src={albumCover()}
          onClick={(e) => redirectToSubjectPage(e)}
        />
      </td>

      <td class="ml-1">
        {subject == "songs" && (
          <img
            src={heart() === "heart" ? heartIcon : filledHeart}
            class="w-5 cursor-pointer hover:opacity-80 transition-all duration-150 mx-auto"
            onClick={handleEditFavouriteSong}
          />
        )}
      </td>

      <td class="w-4/12 lg:max-w-[150px] md:max-w-[100px] max-w-[60px] truncate  text-sm">
        {returnAnchorForSubject()}
      </td>
      <td class="w-4/12 lg:max-w-[150px] md:max-w-[100px] max-w-[60px] truncate  text-sm">
        <A
          href={`/artist/${encodeSubjectName(artist)}`}
          class="hover:text-slate-300"
        >
          {artist}
        </A>
      </td>
      <td class="w-1/24 text-center text-xs text-yellow-400">
        {rating ? `${rating}/5 \u2605` : `0/5 \u2605`}
      </td>
      <td class="w-1/8 text-center sm:text-xs text-[6px]">
        {date.includes("Count") ? date : date ? formatTimeDifference(date) : ""}
      </td>
      <td class="w-1/24  text-center text-red-500 font-bold">
        <span class="cursor-pointer hover:text-red-400">
          {date.includes("Count") ? "" : "x"}
        </span>
      </td>
    </tr>
  );
}

export default ScrobbleRow;
