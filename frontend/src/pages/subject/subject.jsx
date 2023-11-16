import { createEffect, createSignal, useContext } from "solid-js";
import { deleteData, getData, postData } from "../../getUserData";
import { A, useParams } from "@solidjs/router";
import Card from "../../components/userpage/main/card";
import heart from "../../assets/icons/heart.svg";
import filledHeart from "../../assets/icons/filledHeart.svg";
import { UserContext } from "../../contexts/UserContext";
import Comment from "../../components/userpage/main/comment";
import StarRating from "../../components/subjectpage/star-rating";

function Subject() {
  const { user, setUser } = useContext(UserContext);
  const [userRating, setUserRating] = createSignal(0);
  const params = useParams();
  const [subject, setSubject] = createSignal(params.subject);
  const [subjectData, setSubjectData] = createSignal(null);
  const [topSongs, setTopSongs] = createSignal(null);
  const [comments, setComments] = createSignal([]);
  const [comment, setComment] = createSignal("");
  createEffect(() => {
    setSubject(params.subject);
  });

  createEffect(() => {
    if (subjectData() != null && subjectData()[`${subject()}Comments`])
      setComments(subjectData()[`${subject()}Comments`]);
  });

  createEffect(() => {
    if (
      subjectData() != null &&
      subjectData()[`${subject()}Ratings`].length > 0
    ) {
      // check if user has rated this subject
      const userRating_ = subjectData()[`${subject()}Ratings`].filter(
        (rating) => rating.id_User === user().id
      );
      if (userRating_.length > 0) {
        setUserRating(userRating_[0].rating);
      }
    }
  });

  createEffect(async () => {
    const data = await getData(
      `scrobbles/${subject()}/${params.name.replaceAll("+", " ")}`
    );
    setSubjectData(data[subject()]);
    console.log("subject data:", subjectData());
    if (subject() === "artist") {
      const now = new Date();
      //const offset = now.getTimezoneOffset() * 60000;
      const localISOTime = new Date(now).toISOString();
      const formattedNow = localISOTime;

      const sevenDaysBeforeNow = new Date(now.setDate(now.getDate() - 7))
        .toISOString()
        .slice(0, -1);

      const data_ = await postData("scrobbles/top-n-songs-by-artist", {
        artistId: subjectData().id,
        n: 5,
        start: sevenDaysBeforeNow,
        end: formattedNow,
      });
      setTopSongs(data_.songs);
    }
  });

  const songIsFavourite = () => {
    if (user() && subjectData() != null) {
      const favouriteSong = subjectData().favouriteSongs.filter(
        (song) => song.id_User === user().id
      );
      if (favouriteSong.length > 0) {
        return true;
      }
    }
    return false;
  };

  const handleEditFavouriteSong = async () => {
    const img = document.getElementById("favouriteSong");
    if (songIsFavourite()) {
      const res = await deleteData(`favourite-song/delete`, {
        songId: subjectData().id,
      });
      if (res.success) {
        setSubjectData({
          ...subjectData(),
          favouriteSongs: subjectData().favouriteSongs.filter(
            (song) => song.id_User !== user().id
          ),
        });
        img.src = heart;
      }
    } else {
      const res = await postData(`favourite-song/create`, {
        songId: subjectData().id,
      });
      if (res.success) {
        setSubjectData({
          ...subjectData(),
          favouriteSongs: [...subjectData().favouriteSongs, res.favouriteSong],
        });
        img.src = filledHeart;
      }
    }
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments().filter((comment) => comment.id !== commentId));
  };

  const handleSendComment = async (e) => {
    e.preventDefault();
    if (comment()) {
      const res = await postData(`comments/${subject()}/create`, {
        comment: comment(),
        [`${subject()}Id`]: subjectData().id,
      });
      if (res.success) {
        setComments([res[`${subject()}Comment`], ...comments()]);
        setComment("");
      }
    }
  };

  const renderTopSongs = (songs) => {
    if (songs !== null) {
      return songs.map((song, index) => (
        <div class="flex flex-row space-x-4 mt-2 mb-2 items-center">
          <p>{index + 1}</p>
          <img
            src={`data:image/png;base64,${song.song.album.cover}`}
            class="w-20 cursor-pointer"
            onClick={() =>
              (window.location.href = `/album/${song.song.album.name.replaceAll(
                " ",
                "+"
              )}`)
            }
          />
          {user() && <img src={heart} class="w-4" />}
          <a
            href={`/song/${song.song.title.replaceAll(" ", "+")}`}
            class="hover:text-slate-700"
          >
            {song.song.title}
          </a>
          <p>Count: {song.count}</p>
        </div>
      ));
    }
  };

  const renderSubject = (s) => {
    switch (subject()) {
      case "artist":
        return (
          <div>
            <p>Artist name: {s.name}</p>
            <img src={`data:image/png;base64,${s.photo}`} class="w-20 h-20" />
            <p>Most listened songs (last 7 days):</p>
            {renderTopSongs(topSongs())}
            <p>Albums:</p>
            <div class="flex flex-row space-x-2 ml-2">
              {s.albums &&
                s.albums.map((album) => (
                  <Card
                    cover={`data:image/png;base64,${album.cover}`}
                    mainText={album.name}
                    secText={""}
                    rating={album.rating}
                    heart="heart"
                    subject="album"
                  />
                ))}
            </div>
          </div>
        );
      case "album":
        return (
          <>
            <p>Album name: {s.name}</p>
            <p>
              Artist name:{" "}
              <a
                href={`/artist/${s.artist.name.replaceAll(" ", "+")}`}
                class="hover:text-slate-700"
              >
                {s.artist.name}
              </a>
            </p>
            <img src={`data:image/png;base64,${s.cover}`} class="w-20 h-20" />
            <p>Songs:</p>

            {s.songs.map((song, index) => (
              <div class="flex flex-row space-x-2">
                <p>{index + 1}</p>
                {user() && <img src={heart} class="w-4" />}
                <p>
                  <a
                    href={`/song/${song.title.replaceAll(" ", "+")}`}
                    class="hover:text-slate-700"
                  >
                    {song.title}
                  </a>
                </p>
              </div>
            ))}
          </>
        );
      case "song":
        //when trying to click on album page properties change but url stays the same. why?
        return (
          <div class="flex flex-col justify-between">
            <p>Song name: {s.title}</p>
            <p>
              Album name:&nbsp;
              <a
                href={`/album/${s.album.name.replaceAll(" ", "+")}`}
                class="hover:text-slate-700"
              >
                {s.album.name}
              </a>
            </p>
            <p>
              Artist name:&nbsp;
              <a
                href={`/artist/${s.album.artist.name.replaceAll(" ", "+")}`}
                class="hover:text-slate-700"
              >
                {s.album.artist.name}
              </a>
            </p>
            <p>Album cover:</p>
            <img
              src={`data:image/png;base64,${s.album.cover}`}
              class="w-20 h-20"
            />
            {user() && (
              <img
                src={songIsFavourite() ? filledHeart : heart}
                class="w-4"
                onClick={handleEditFavouriteSong}
                id="favouriteSong"
              />
            )}
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div class="w-[100%]">
      <h1 class={"text-2xl"}>{subject().toUpperCase()}</h1>
      {subjectData() != null && renderSubject(subjectData())}
      {subjectData() != null && user() && (
        <StarRating
          rating={userRating()}
          setRating={setUserRating}
          itemId={subjectData().id}
          subject={subject()}
        />
      )}
      Comments:
      <br />
      {user() && (
        <form onsubmit={handleSendComment} class="flex mb-4">
          <input
            type="text"
            class="border border-slate-700 w-[100%] bg-slate-700"
            value={comment()}
            onInput={(e) => setComment(e.target.value)}
          />
          <button class="border border-slate-700 ml-4 p-4">Send</button>
        </form>
      )}
      {comments() != null &&
        comments().map((comment) => (
          <Comment
            avatar={comment.sender.avatar}
            comment={comment.content}
            username={comment.sender.userName}
            date={new Date(comment.creation_Date).toLocaleDateString()}
            loggedUser={user()}
            recipientId={comment.sender.id}
            onDelete={handleDeleteComment}
            commentId={comment.id}
            subject={subject()}
          />
        ))}
    </div>
  );
}

export default Subject;
