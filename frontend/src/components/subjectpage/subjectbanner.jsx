import Avatar from "../userpage/userbanner/avatar";
import SubjectInfoBar from "./subjectinfobar";
import { createEffect, createSignal, useContext } from "solid-js";
import heartIcon from "../../assets/icons/heart.svg";
import filledHeart from "../../assets/icons/filledHeart.svg";
import { UserContext } from "../../contexts/UserContext";
import { deleteData, postData } from "../../getUserData";
function SubjectBanner(props) {
  const [bannerImage, setbannerImage] = createSignal(null);
  const [subject, setsubject] = createSignal(null);
  const { user, setUser } = useContext(UserContext);
  const [heart, setHeart] = createSignal("");

  createEffect(() => {
    setbannerImage(props.subjectSecondaryImage);
    setsubject(props.subject);
  }, [props]);

  createEffect(() => {
    if (subject() === "song") setHeart(props.heart);
  });

  const songIsFavourite = () => {
    if (heart() === "filledHeart") return true;
    return false;
  };

  const handleEditFavouriteSong = async () => {
    if (songIsFavourite()) {
      await deleteData(`favourite-song/delete`, {
        songId: props.songId,
      });
      setHeart("heart");
    } else {
      await postData(`favourite-song/create`, {
        songId: props.songId,
      });
      setHeart("filledHeart");
    }
  };

  return (
    <div class="flex flex-row h-[100%]">
      <div
        class="border border-slate-700 aspect-square h-[100%] w-[15%] relative"
        style={`background-image: url(data:image/png;base64,${props.subjectImage})`}
      >
        {subject() === "song" && user() && (
          <img
            src={songIsFavourite() ? filledHeart : heartIcon}
            class="w-8 absolute bottom-0 right-0 cursor-pointer hover:opacity-90 transition-all duration-150"
            onClick={(e) => {
              e.preventDefault();
              handleEditFavouriteSong();
            }}
          />
        )}
        {/* <img class="" src={`data:image/png;base64,${props.subjectImage}`} /> */}
      </div>
      <div class="flex flex-col flex-grow">
        <SubjectInfoBar
          image={bannerImage()}
          primaryText={props.primaryText}
          secondaryText={props.secondaryText}
          scrobbleCount={props.scrobbleCount}
          usersCount={props.usersCount}
          subject={subject()}
        />
      </div>
    </div>
  );
}

export default SubjectBanner;
