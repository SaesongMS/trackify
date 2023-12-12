import { createEffect, createSignal } from "solid-js";
import { deleteData, patchData } from "../../../getUserData";
import { useNavigate } from "@solidjs/router";

function Comment(props) {
  const [isEditing, setIsEditing] = createSignal(false);
  const [editedComment, setEditedComment] = createSignal("");
  const {
    avatar,
    username,
    comment,
    date,
    loggedUser,
    recipientId,
    commentId,
    onDelete,
    subject,
    isAdmin,
    ...others
  } = props;

  createEffect(() => {
    setEditedComment(comment);
  }, [comment]);

  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteData(`comments/${subject}/${commentId}`);
    onDelete(commentId);
  };

  const navigate = useNavigate();

  const handleUserClick = (e) => {
    e.preventDefault();
    navigate(`/user/${username}/main`);
  };

  const handleCommentClick = (e) => {
    e.preventDefault();
    if (isAdmin) setIsEditing(true);
  };

  const handleCommentChange = (event) => {
    setEditedComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    setIsEditing(false);
    const res = await patchData(
      `comments/${subject}/${commentId}`,
      editedComment()
    );
    console.log(res);
  };

  return (
    <div class="flex w-[100%] h-[10%] border border-[#3f4147] rounded-sm hover:border-slate-500 transition-all duration-200">
      <div onClick={handleUserClick}>
        <img
          class="h-[100%] w-20 aspect-square mr-2 hover:cursor-pointer"
          src={`data:image/png;base64,${avatar}`}
        />
      </div>
      <div class="flex flex-grow">
        <div class="flex flex-col mt-1">
          <span class="mr-4 cursor-pointer text-md">
            <a href={`/user/${username}/main`}>{username}</a>
          </span>
          <div onClick={handleCommentClick}>
            {isEditing() ? (
              <input
                class="mr-4 text-black"
                value={editedComment()}
                onChange={handleCommentChange}
                onBlur={handleCommentSubmit}
              />
            ) : (
              <span class="mr-4 text-sm">{editedComment()}</span>
            )}
          </div>
        </div>
      </div>
      <div class="flex items-start pb-1 text-xs">
        <span class="mr-4 cursor-default">{date}</span>
        {loggedUser &&
          (loggedUser.userName == username ||
            loggedUser.id === recipientId ||
            isAdmin) && (
            <button class="mr-4 cursor-pointer" onClick={handleDelete}>
              X
            </button>
          )}
      </div>
    </div>
  );
}

export default Comment;
