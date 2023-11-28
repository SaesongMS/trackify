import Counter from "../userpage/userbanner/counter";
import { createEffect, createSignal } from "solid-js";
import { encodeSubjectName } from "../../encodeSubjectName";
import SpotifyLogo from "../../assets/icons/spotify_logo.png";
function SubjectInfoBar(props) {
  const [primaryText, setprimaryText] = createSignal(null);
  const [secondaryText, setsecondaryText] = createSignal(null);
  const [scrobbleCount, setscrobbleCount] = createSignal(null);
  const [usersCount, setusersCount] = createSignal(null);
  const [image, setimage] = createSignal(null);
  const [subject, setsubject] = createSignal(null);
  const [idSpotify, setidSpotify] = createSignal(null);

  createEffect(() => {
    setprimaryText(props.primaryText);
    setsecondaryText(props.secondaryText);
    setscrobbleCount(props.scrobbleCount);
    setusersCount(props.usersCount);
    setimage(props.image);
    setsubject(props.subject);
    setidSpotify(props.idSpotify);
  }, [props]);

  const handleNavigation = () => {
    if (subject() === "album" || subject() === "song") {
      window.location.href = `/artist/${encodeSubjectName(secondaryText())}`;
    }
  };

  const getHref = () => {
    if (subject() == "song")
      return `https://open.spotify.com/track/${idSpotify()}`
    else
      return `https://open.spotify.com/${subject()}/${idSpotify()}`
  }

  return (
    <div
      class="h-[100%] bg-no-repeat bg-cover"
      style={`background-image: url(data:image/png;base64,${image()})`}
    >
      <div
        class={`h-[100%] flex flex-col md:flex-row w-[100%] bg-black bg-opacity-50 text-slate-200 pb-2 pl-2`}
      >
        <div class="flex flex-col justify-end ml-2">
          <div class="text-[40px] font-bold">{primaryText()}</div>
          <div onClick={handleNavigation} class="cursor-pointer">
            {secondaryText()}
          </div>
        </div>
        <div class="flex ml-2 md:ml-12 md:pl-4 ">
          <Counter title="Scrobbles" count={scrobbleCount()} />
          <Counter title="Listeners" count={usersCount()} />
          <div class="right-0 flex flex-col justify-end pr-6">
            <a
              href={getHref()}
              class="bg-[#191414] text-[#1DB954] p-2 rounded-xl font-bold text-center opacity-80 hover:opacity-100 transition-all duration-150 hover:shadow-lg"
            >
              <img
                class="w-4 inline-block mr-1"
                src={SpotifyLogo}
              />
              Play on Spotify
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SubjectInfoBar;
