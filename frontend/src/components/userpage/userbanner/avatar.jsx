import { createEffect, createSignal, useContext } from "solid-js";
import { UserContext } from "../../../contexts/UserContext";
import { postData, deleteData } from "../../../getUserData";
import tickIcon from "../../../assets/icons/tick.svg";
import plusIcon from "../../../assets/icons/plus.svg";
import { getData } from "../../../getUserData";

function Avatar(props) {
  const { user } = useContext(UserContext);
  const [image, setImage] = createSignal(props.image);
  const [followers, setFollowers] = createSignal(null);
  const [text, setText] = createSignal("Follow");

  const getFollowers = async () => {
    const followersData = await getData(`follows/get-followed?userId=${props.userId}`);
    console.log(followersData);
    console.log(followersData.followedId);
    setFollowers(followersData.followedId);
    console.log(followers());
  }

  const userIsFollowing = () => {
    if(!followers()) return;

    if (followers().includes(props.profileId)) {
      setText("Unfollow");
      console.log("user is following");
    }else{
      console.log("user is not following");
    }

  };

  createEffect(() => {
    getFollowers();
  });

  createEffect(() => {
    setImage(props.image);
    if (user()){
      userIsFollowing();
      console.log(user())
    } 
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
