import { A } from "@solidjs/router";
import { deleteData } from "../../../getUserData";

function Follower(props) {
  const { userName, avatar } = props;

  const handleUnfollow = async (e) => {
    e.preventDefault();
    await deleteData(`follows/delete`, { userId: props.followedId });
    props.handleUnfollow(props.followedId);
  };

  return (
    <>
      <A
        href={`/user/${userName}/main`}
        class="shadow-lg mb-2 ml-2 transition-all w-fit duration-200  cursor-pointer"
      >
        {userName}
        <img
          src={`data:image/png;base64,${avatar}`}
          alt="profile picture"
          class="max-w-[150px]"
        />
      </A>
      {props.profileUsername != null &&
        props.loggedUsername != null &&
        props.profileUsername == props.loggedUsername && (
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-32"
            onClick={handleUnfollow}
          >
            Unfollow
          </button>
        )}
    </>
  );
}
export default Follower;
