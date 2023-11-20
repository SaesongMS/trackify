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
    <div class="text-[#f2f3ea] flex flex-row w-[100%] pl-3 border border-[#3f4147] items-center hover:rounded-sm hover:border-slate-500 transition-all duration-150 h-[10%]">
      <img
        class="mr-4 cursor-pointer max-w-[10%] hover:opacity-80 transition-all duration-150"
        src={`data:image/png;base64,${albumCover}`}
        onClick={() =>
          (window.location.href = `/song/${title.replaceAll(" ", "+")}`)
        }
      />
      <span class="mr-4 cursor-pointer max-w-[10%]">
        <img src={heart} class="w-4" />
      </span>
      <div class="flex flex-col md:flex-row max-w-[75%] md:justify-center md:items-center">
        <span class="md:mr-4 cursor-pointer hover:text-slate-300 truncate">
          <A href={`/song/${title.replaceAll(" ", "+")}`}>{title}</A>
        </span>
        <span class="md:mr-4 cursor-pointer hover:text-slate-300truncate">
          <A href={`/artist/${artist.replaceAll(" ", "+")}`}>{artist}</A>
        </span>
        <span class="md:mr-4 cursor-pointer md:max-w-[10%]">{rating ? rating : ""}</span>
        <span class="md:mr-4 cursor-default md:max-w-[15%]">
          {date ? formatTimeDifference(date) : ""}
        </span>
      </div>
      <span class="mr-4 cursor-pointe text-red-500 max-w-[5%]">x</span>
    </div>
  );
}
export default ScrobbleRow;
