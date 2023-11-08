import { createSignal } from "solid-js";
import { deleteData } from "../../../getUserData";

function Card(props) {
  const { cover, mainText, secText, rating, heart, ...others } = props;
  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteData(`favourite-song/delete`, { songId: props.songId });
    props.handleDelete(props.songId);
  };
  return (
    <div
      class="flex-col border border-slate-700 w-[15%] aspect-square bg-no-repeat bg-cover"
      style={`background-image: url(${cover})`}
    >
      {/* <div class="h-[75%] w-[100%] border-b border-slate-700">
                <img class="h-[100%] w-[100%]" src={cover} />
            </div> */}
      <div class="h-[25%] w-[100%] flex justify-between pl-2 pr-2 pt-2">
        <div class="flex flex-col">
          <span class="text-xs">{mainText}</span>
          <span class="text-xs">{secText}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-xs">{rating}</span>
          <span class="text-xs">{heart}</span>
          {props.profileId != null &&
            props.loggedUserId != null &&
            props.profileId == props.loggedUserId && (
              <button class="mr-4 cursor-pointer" onClick={handleDelete}>
                X
              </button>
            )}
        </div>
      </div>
    </div>
  );
}
export default Card;
