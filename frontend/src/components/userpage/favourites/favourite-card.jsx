import { createEffect, createSignal, useContext } from "solid-js";
import { encodeSubjectName } from "../../../encodeSubjectName";
import filledHeart from "../../../assets/icons/filledHeart.svg";
import filledHeartWhite from "../../../assets/icons/filledHeartWhite.svg";
import emptyHeart from "../../../assets/icons/heart.svg";
import { UserContext } from "../../../contexts/UserContext";
import { deleteData, postData } from "../../../getUserData";
function FavouriteCard(props) {
  const { cover, mainText, secText, rating, profileId, ...others } = props;
  const [subject, setSubject] = createSignal(null);
  const { user } = useContext(UserContext);
  const [heart, setHeart] = createSignal(filledHeart);

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

  const handleClickOnIcon = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user()) return;
    if (heart() === filledHeart) {
      setHeart(emptyHeart);
      await deleteData("favourite-song/delete", {
        songId: others.songId,
      });
    } else {
      setHeart(filledHeart);
      await postData("favourite-song/create", {
        songId: others.songId,
      });
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
      <div class="flex h-full flex-col bg-black bg-opacity-30">
        <div class="flex flex-grow flex-col pl-1 relative">
          <a
            class="text-m w-[100%] hover:text-slate-300"
            href={`/${subject()}/${encodeSubjectName(mainText)}`}
          >
            {mainText}
          </a>
          <a href={`/artist/${encodeSubjectName(secText)}`}>
            <span
              class="text-xs w-[100%] hover:text-slate-300"
              onClick={(e) => redirectToArtistPage(e)}
            >
              {secText}
            </span>
          </a>
          <span>
            <img
              src={
                user() && user().id == profileId ? heart() : filledHeartWhite
              }
              alt=""
              class="w-8 absolute bottom-0 right-0 cursor-pointer hover:opacity-90 transition-all duration-150"
              onClick={(e) => handleClickOnIcon(e)}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default FavouriteCard;
