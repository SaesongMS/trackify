import ScrobbleRow from "./scrobbleRow";
import Card from "./card";
import Comment from "./comment";
import { createEffect, createSignal } from "solid-js";
import { postData } from "../../../getUserData";
import ArrowUp from "../../../assets/icons/arrow-up.svg";

function MainPage(props) {
  const { loggedUser } = props;
  const [comments, setComments] = createSignal(props.comments);
  const [comment, setComment] = createSignal("");

  createEffect(() => {
    setComments(props.comments);
  }, [props.comments]);

  const handleDeleteComment = (commentId) => {
    setComments(comments().filter((comment) => comment.id !== commentId));
  };

  const handleSendComment = async (e) => {
    e.preventDefault();

    const res = await postData(`comments/profile/create`, {
      comment: comment(),
      recipientId: props.profileId,
    });

    if (res.success) {
      setComments([res.profileComment, ...comments()]);
      setComment("");
    }
  };

  return (
    <div class="flex flex-col xl:flex-row-reverse overflow-y-auto 2xl:h-[80%] text-slate-200">
      <div class="xl:border-l-2 w-full xl:w-[40%] p-6 max-h-[100%]">
        Scrobbles
        <div class="flex flex-col space-y-2 mt-2">
          {props.scrobbles.slice(0,10).map((scrobble) => (
            <ScrobbleRow
              albumCover={scrobble.song.album.cover}
              heart="heart"
              title={scrobble.song.title}
              artist={scrobble.song.album.artist.name}
              album={scrobble.song.album.name}
              rating="5/5"
              date={scrobble.scrobble_Date}
            />
          ))}
        </div>
      </div>
      <div id="page" class="xl:w-[60%] p-6 xl:overflow-y-auto h-[100%]">
        Artist
        <br />
        <div class="flex w-[100%] space-x-4 mt-4 mb-4">
          {props.topArtists.slice(0,5).map((topArtist) => (
            <Card
              cover={`data:image/png;base64,${topArtist.artist.photo}`}
              mainText={topArtist.artist.name}
              rating={topArtist.rating}
              heart="heart"
              subject="artist"
            />
          ))}
          <div class="flex flex-col justify-center items-center">
            <img class="w-8 h-8 rotate-90" src={ArrowUp} />
            <p class=" text-black">See more</p>
          </div>
        </div>
        Album
        <br />
        <div class="flex w-[100%] space-x-4 mt-4 mb-4">
          {props.topAlbums.slice(0,5).map((topAlbum) => (
            <Card
              cover={`data:image/png;base64,${topAlbum.album.cover}`}
              mainText={topAlbum.album.name}
              secText={topAlbum.album.artist.name}
              rating={topAlbum.rating}
              heart="heart"
              subject="album"
            />
          ))}
        </div>
        Song
        <br />
        <div class="flex w-[100%] space-x-4 mt-4 mb-4">
          {props.topSongs.slice(0,5).map((topSong) => (
            <Card
              cover={`data:image/png;base64,${topSong.song.album.cover}`}
              mainText={topSong.song.title}
              secText={topSong.song.album.artist.name}
              rating={topSong.rating}
              heart="heart"
              subject="song"
            />
          ))}
        </div>
        Comments
        <br />
        {loggedUser && (
          <div class="h-[10%] pb-4 mt-4 mb-4">
            <form onsubmit={handleSendComment} class="flex">
              <input
                type="text"
                class="border border-slate-700 w-[100%] bg-slate-700"
                value={comment()}
                onInput={(e) => setComment(e.target.value)}
              />
              <button class="border border-slate-700 ml-4 p-4">Send</button>
            </form>
          </div>
        )}
        {comments().map((comment) => (
          <Comment
            avatar={
              comment.sender.profilePicture
                ? comment.sender.profilePicture
                : comment.sender.avatar
            }
            username={comment.sender.userName}
            comment={comment.comment}
            commentId={comment.id}
            date={new Date(comment.creation_Date).toLocaleDateString()}
            loggedUser={loggedUser}
            recipientId={comment.id_Recipient}
            onDelete={handleDeleteComment}
            subject="profile"
          />
        ))}
      </div>
      
    </div>
  );
}
export default MainPage;
