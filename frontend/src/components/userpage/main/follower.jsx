import { A } from "@solidjs/router";
import { deleteData } from "../../../getUserData";

function Follower(props) {
  const { userName, avatar, bio } = props;

  const handleUnfollow = async (e) => {
    e.preventDefault();
    if (confirm("Are you sure you want to unfollow this user?")) {
      await deleteData(`follows/delete`, { userId: props.followedId });
      props.handleUnfollow(props.followedId);
    }
  };

  return (
    <div class="w-auto flex flex-row mt-2 border border-slate-500 rounded-lg ml-2 hover:border-slate-600 shadow-md mr-2">
      <A
        href={`/user/${userName}/main`}
        class="shadow-lg mb-2 ml-2 transition-all duration-200  cursor-pointer"
      >
        <img
          src={`data:image/png;base64,${avatar}`}
          alt="profile picture"
          class="max-w-[150px] aspect-square hover:opacity-90 mt-2 rounded-md"
        />
      </A>
      <div class="flex flex-col">
        <A href={`/user/${userName}/main`} class="ml-2">
          <p class="font-bold hover:text-slate-700">{userName}</p>
        </A>
        <p class="ml-2 truncate w-72 md:w-44 lg:w-36 xl:w-60 2xl:w-56">{bio}</p>
        {props.profileUsername != null &&
          props.loggedUsername != null &&
          props.profileUsername == props.loggedUsername && (
            <button
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-32 ml-2"
              onClick={handleUnfollow}
            >
              Unfollow
            </button>
          )}
      </div>
    </div>
  );
}
export default Follower;
