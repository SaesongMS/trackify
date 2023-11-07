import { createSignal } from "solid-js";
import { deleteData } from "../../../getUserData";

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

  const [isDeleted, setIsDeleted] = createSignal(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteData(`comments/profile/${commentId}`);
    // window.location.reload();
    onDelete(commentId);
  };

  if (isDeleted()) return null;

  return (
    <div class="flex w-[100%] h-[10%] border border-slate-800 rounded-sm hover:border-slate-500 transition-all duration-200">
      <img
        class="h-[100%] aspect-square mr-2"
        src={`data:image/png;base64,${avatar}`}
      />
      <div class="flex flex-grow">
        <div class="flex flex-col">
          <span class="mr-4 cursor-pointer">{username}</span>
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
