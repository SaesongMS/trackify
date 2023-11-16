import { A } from "@solidjs/router";
import heart from "../../../assets/icons/heart.svg";

function ScrobbleRow(props) {
  const { albumCover, title, artist, rating, date, album, ...others } = props;

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
    <div class="flex w-[100%] pl-3 border border-slate-400  items-center hover:rounded-sm hover:border-slate-500 transition-all duration-150 h-[10%]">
      <img
        class="mr-4 cursor-pointer w-[10%] hover:opacity-80 transition-all duration-150"
        src={`data:image/png;base64,${albumCover}`}
        onClick={() =>
          (window.location.href = `/album/${album.replaceAll(" ", "+")}`)
        }
      />
      <span class="mr-4 cursor-pointer">
        <img src={heart} class="w-4" />
      </span>
      <span class="mr-4 cursor-pointer hover:text-slate-300">
        <A href={`/song/${title.replaceAll(" ", "+")}`}>{title}</A>
      </span>
      <span class="mr-4 cursor-pointer hover:text-slate-300">
        <A href={`/artist/${artist.replaceAll(" ", "+")}`}>{artist}</A>
      </span>
      <span class="mr-4 cursor-pointer">{rating ? rating : ""}</span>
      <span class="mr-4 cursor-pointer">options</span>
      <span class="mr-4 cursor-default">
        {date ? formatTimeDifference(date) : ""}
      </span>
    </div>
  );
}
export default ScrobbleRow;
