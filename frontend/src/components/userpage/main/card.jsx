import { createEffect, createSignal } from "solid-js";
import { encodeSubjectName } from "../../../encodeSubjectName";

function Card(props) {
  const { cover, mainText, secText, rating, ...others } = props;
  const [subject, setSubject] = createSignal(null);

  createEffect(() => {
    setSubject(others.subject);
  });

  const handleClick = (e) => {
    e.preventDefault();
    if (mainText === "Your top subject") return;
    if (others.subject) {
      window.location.href = `/${subject()}/${encodeSubjectName(
        props.mainText
      )}`;
    }
  };

  const redirectToArtistPage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = `/artist/${encodeSubjectName(secText)}`;
  };

  return (
    <div
      class="flex flex-col border border-[#3f4147] hover:border-slate-500 hover:rounded-sm transition-all duration-150 w-[100%] aspect-square bg-no-repeat bg-cover hover:cursor-pointer"
      style={`background-image: url(${cover})`}
      onclick={(e) => handleClick(e)}
    >
      {/* <div class="h-[75%] w-[100%] border-b border-slate-700">
                <img class="h-[100%] w-[100%]" src={cover} />
            </div> */}
      <div class="flex h-full flex-col bg-black bg-opacity-30">
        <div class="flex flex-grow flex-col pl-1">
          <a
            class="text-m w-[100%] hover:text-slate-300"
            href={`/${subject()}/${encodeSubjectName(mainText)}`}
          >
            {mainText}
          </a>
          {secText && secText != "will appear here" && (
            <a
              href={`/artist/${encodeSubjectName(secText)}`}
            >
              <span
                class="text-xs w-[100%] hover:text-slate-300"
                // onClick={(e) => redirectToArtistPage(e)}
              >
                {secText}
              </span>
            </a>
          )}
          {secText && secText == "will appear here" && (
            <span class="text-xs w-[100%] hover:text-slate-300">{secText}</span>
          )}
        </div>
      </div>
    </div>
  );
}
export default Card;
