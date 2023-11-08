function ScrobbleRow(props) {
  const { albumCover, heart, title, artist, rating, date, ...others } = props;

  function formatTimeDifference(scrobbleDate) {
    const currentDate = new Date();
    const scrobbleDateObject = new Date(scrobbleDate);

    const timeZoneOffset = currentDate.getTimezoneOffset() * 60000;

    const timeDifference = currentDate - scrobbleDateObject - timeZoneOffset;

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
        class="mr-4 cursor-pointer w-[10%]"
        src={`data:image/png;base64,${albumCover}`}
      />
      <span class="mr-4 cursor-pointer">Heart</span>
      <span class="mr-4 cursor-pointer">{title}</span>
      <span class="mr-4 cursor-pointer">{artist}</span>
      <span class="mr-4 cursor-pointer">{rating}</span>
      <span class="mr-4 cursor-pointer">options</span>
      <span class="mr-4 cursor-default">{formatTimeDifference(date)}</span>
    </div>
  );
}
export default ScrobbleRow;
