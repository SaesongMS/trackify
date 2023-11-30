import { createEffect, createSignal, useContext } from "solid-js";
import { UserContext } from "../../../contexts/UserContext";
import { postData, deleteData } from "../../../getUserData";
import tickIcon from "../../../assets/icons/tick.svg";
import plusIcon from "../../../assets/icons/plus.svg";

function Avatar(props) {
  const { user } = useContext(UserContext);
  const [image, setImage] = createSignal(props.image);
  const [followers, setFollowers] = createSignal(props.followers);
  const [text, setText] = createSignal("Follow");

  const userIsFollowing = () => {
    if (!followers()) return;

    followers().map((follower) => {
      if (follower.id_Follower == user().id) {
        setText("Unfollow");
        return;
      }
    });
  };

  createEffect(() => {
    setImage(props.image);
    setFollowers(props.followers);
    if (user()) userIsFollowing();
  });

  const handleClick = async (e) => {
    e.preventDefault();
    if (text() == "Follow") {
      await postData("follows/create", {
        userId: props.profileId,
      });
      setText("Unfollow");
    } else {
      await deleteData("follows/delete", {
        userId: props.profileId,
      });
      setText("Follow");
    }
  };
  return (
    <div
      class="h-[100%] aspect-square border border-[#3f4147] relative bg-no-repeat bg-cover"
      style={`background-image: url(data:image/png;base64,${image()})`}
    >
      {/* <img class="h-[100%] w-[100%]" src={`data:image/png;base64,${props.image}`}/> */}
      {/* classes before (div) 
       h-[100%] aspect-square border border-[#3f4147] */}
      {user() && user().id != props.profileId && (
        <div>
          <button
            class="absolute bottom-0 right-0 rounded-lg cursor-pointer hover:opacity-90 transition-all duration-150 bg-slate-400 opacity-60"
            onClick={(e) => handleClick(e)}
          >
            <img src={text() === "Unfollow" ? tickIcon : plusIcon} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Avatar;
