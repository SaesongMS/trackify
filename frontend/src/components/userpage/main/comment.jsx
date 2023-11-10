import { deleteData } from "../../../getUserData";
import { A } from "@solidjs/router";
import { useNavigate } from "@solidjs/router";

function Comment(props) {
  const {
    avatar,
    username,
    comment,
    date,
    loggedUser,
    recipientId,
    commentId,
    onDelete,
    ...others
  } = props;

  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteData(`comments/profile/${commentId}`);
    onDelete(commentId);
  };

  const navigate = useNavigate();

  const handleUserClick = (e) => {
    e.preventDefault();
    navigate(`/user/${username}/main`);
  }

  return (
    <div class="flex w-[100%] h-[10%] border border-slate-800 rounded-sm hover:border-slate-500 transition-all duration-200">
      <div onClick={handleUserClick}>
        <img
          class="h-[100%] aspect-square mr-2"
          src={`data:image/png;base64,${avatar}`}
        />
      </div>
      <div class="flex flex-grow">
        <div class="flex flex-col">
          <span class="mr-4 cursor-pointer">
            <A href={`/user/${username}/main`}>{username}</A>
          </span>
          <span class="mr-4 cursor-pointer">{comment}</span>
        </div>
      </div>
      <div class="flex items-center">
        <span class="mr-4 cursor-pointer">options</span>
        <span class="mr-4 cursor-default">{date}</span>
        {loggedUser &&
          (loggedUser.userName == username ||
            loggedUser.id === recipientId) && (
            <button class="mr-4 cursor-pointer" onClick={handleDelete}>
              X
            </button>
          )}
      </div>
    </div>
  );
}

export default Comment;
