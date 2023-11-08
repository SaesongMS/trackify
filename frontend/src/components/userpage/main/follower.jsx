import { A } from "@solidjs/router";
import { deleteData } from "../../../getUserData";

function Follower(props) {
  const { userName, profilePicture } = props;

  return (
    <>
      <A
        href={`/user/${userName}/main`}
        class="shadow-lg mb-2 ml-2 transition-all w-fit duration-200  cursor-pointer"
      >
        {userName}
        <img
          src={`data:image/png;base64,${profilePicture}`}
          alt="profile picture"
          class="max-w-[150px]"
        />
      </A>
    </>
  );
}
export default Follower;
