import { createEffect, createSignal, useContext } from "solid-js";
import { UserContext } from "../../../contexts/UserContext";
import { getData, postData, deleteData, patchData } from "../../../getUserData";
import tickIcon from "../../../assets/icons/tick.svg";
import plusIcon from "../../../assets/icons/plus.svg";
import editIcon from "../../../assets/icons/edit.svg";
import { AdminContext } from "../../../contexts/AdminContext";

function Avatar(props) {
  const { user } = useContext(UserContext);
  const { admin } = useContext(AdminContext);
  const [image, setImage] = createSignal(props.image);
  const [followers, setFollowers] = createSignal(null);
  const [text, setText] = createSignal("Follow");
  const [newImage, setNewImage] = createSignal(null);

  const getFollowers = async () => {
    const followersData = await getData(
      `follows/get-followed?userId=${props.userId}`
    );
    setFollowers(followersData.followedId);
  };

  const userIsFollowing = () => {
    if (!followers()) return;

    if (followers().includes(props.profileId)) {
      setText("Unfollow");
      console.log("user is following");
    } else {
      console.log("user is not following");
    }
  };

  createEffect(() => {
    getFollowers();
  });

  createEffect(() => {
    setImage(props.image);
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

  createEffect(() => {
    if (newImage()) handleEditAvatar();
  });

  const onUpload = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditAvatar = async () => {
    const res = await patchData("users/avatar", {
      avatar: newImage(),
      userId: props.profileId,
    });
    if (res.success) setImage(res.avatar);
    else console.log("error:", res);
    setNewImage(null);
  };

  return (
    <div
      class="h-[100%] aspect-square border border-[#3f4147] relative bg-no-repeat bg-cover"
      style={`background-image: url(data:image/png;base64,${image()})`}
    >
      {user() && user().id != props.profileId && (
        <div>
          {admin() && (
            <>
              <button
                class="absolute top-0 right-0 rounded-lg cursor-pointer hover:opacity-90 transition-all duration-150 bg-slate-400 opacity-60"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("newAvatar").click();
                }}
              >
                <img src={editIcon} class="w-6 h-6" />
              </button>
              <input
                type="file"
                id="newAvatar"
                class="hidden"
                onChange={onUpload}
              />
            </>
          )}
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
