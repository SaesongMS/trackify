import ScrobbleRow from "./scrobbleRow";
import Card from "./card";
import Comment from "./comment";
import AppLogo from "../../../assets/icons/logo.png";
import Belmondo from "../../../assets/icons/belmondo.png";
function MainPage(props) {
  return (
    <div class="flex h-[80%] text-slate-200">
      <div class="w-[63%] p-6 overflow-scroll h-[100%]">
        Artist
        <br />
        <div class="flex w-[100%] space-x-4 mt-4 mb-4">
          {props.topArtists.map((topArtist) => (
            <Card
              cover={`data:image/png;base64,${topArtist.artist.photo}`}
              mainText={topArtist.artist.name}
              rating={topArtist.rating}
              heart="heart"
            />
          ))}
        </div>
        Album
        <br />
        <div class="flex w-[100%] space-x-4 mt-4 mb-4">
          {props.topAlbums.map((topAlbum) => (
            <Card
              cover={`data:image/png;base64,${topAlbum.album.cover}`}
              mainText={topAlbum.album.name}
              secText={topAlbum.album.artist.name}
              rating={topAlbum.rating}
              heart="heart"
            />
          ))}
        </div>
        Song
        <br />
        <div class="flex w-[100%] space-x-4 mt-4 mb-4">
          {props.topSongs.map((topSong) => (
            <Card
              cover={`data:image/png;base64,${topSong.song.album.cover}`}
              mainText={topSong.song.title}
              secText={topSong.song.album.artist.name}
              rating={topSong.rating}
              heart="heart"
            />
          ))}
        </div>
        Comments
        <br />
        <div class="flex h-[10%] pb-4 mt-4 mb-4">
          <input type="text" class="border border-slate-700 w-[100%]" />
          <button class="border border-slate-700 ml-4 p-4">Send</button>
        </div>
        {props.comments.map((comment) => (
          <Comment
            avatar={comment.sender.profilePicture}
            username={comment.sender.userName}
            comment={comment.comment}
            date={new Date(comment.creation_Date).toLocaleDateString()}
          />
        ))}
      </div>
      <div class="border-l-2 w-[37%] p-6 h-[100%]">
        Scrobbles
        <div class="flex flex-col space-y-2 mt-2">
          {props.scrobbles.map((scrobble) => (
            <ScrobbleRow
              albumCover={scrobble.song.album.cover}
              heart="heart"
              title={scrobble.song.title}
              artist={scrobble.song.album.artist.name}
              rating="5/5"
              date={scrobble.scrobble_Date}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default MainPage;
