import { createEffect, createSignal } from "solid-js";
import { deleteData } from "../../../getUserData";
import hearticon from "../../../assets/icons/heart.svg";

function Card(props) {
  const { cover, mainText, secText, rating, heart, ...others } = props;
  const [subject, setSubject] = createSignal(null);
  const [url, setUrl] = createSignal(null);
  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteData(`favourite-song/delete`, { songId: props.songId });
    props.handleDelete(props.songId);
  };

  createEffect(() => {
    setSubject(others.subject);
  });

  const handleClick = (e) => {
    e.preventDefault();
    if (others.subject) {
      //setUrl(`/${props.subject}/${props.mainText.replace(" ", "+")}`);
      window.location.href = `/${subject()}/${props.mainText.replaceAll(
        " ",
        "+"
      )}`;
    }
  };

  return (
    <div
      class="flex flex-col border border-[#3f4147] hover:border-slate-500 hover:rounded-sm transition-all duration-150 w-[100%] aspect-square bg-no-repeat bg-cover hover:cursor-pointer"
      style={`background-image: url(${cover})`}
      onclick={handleClick}
    >
      {/* <div class="h-[75%] w-[100%] border-b border-slate-700">
                <img class="h-[100%] w-[100%]" src={cover} />
            </div> */}
        <div class="flex h-full flex-col bg-black bg-opacity-30">

        <div class="flex flex-grow flex-col pl-1">

          <span class="text-m w-[100%]">{mainText}</span>
          <span class="text-xs w-[100%]">{secText}</span>
        </div>

            <div class="flex flex-col pl-1 pb-1">
          <span class="text-xs"><img src={hearticon} class="w-4" /></span>

            </div>
        </div>
        
      {/* <div class="h-[25%] w-[100%] flex justify-between pl-2 pr-2 pt-2">
        <div class="flex flex-col">
          <span class="text-xs">{rating}</span>
          {props.profileId != null &&
            props.loggedUserId != null &&
            props.profileId == props.loggedUserId && (
              <button class="mr-4 cursor-pointer" onClick={handleDelete}>
                X
              </button>
            )}
        </div>
      </div> */}
    </div>
  );
}
export default Card;
