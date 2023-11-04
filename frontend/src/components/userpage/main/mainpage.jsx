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
          {props.ratedArtists.map((ratedArtist) => (
            <Card
              cover={`data:image/png;base64,${ratedArtist.artist.photo}`}
              mainText={ratedArtist.artist.name}
              rating={ratedArtist.rating}
              heart="heart"
            />
          ))}
        </div>
        Album
        <br />
        <div class="flex w-[100%] space-x-4 mt-4 mb-4">
          {props.ratedAlbums.map((ratedAlbum) => (
            <Card
              cover={`data:image/png;base64,${ratedAlbum.album.cover}`}
              mainText={ratedAlbum.album.name}
              secText={ratedAlbum.album.artist.name}
              rating={ratedAlbum.rating}
              heart="heart"
            />
          ))}
        </div>
        Song
        <br />
        <div class="flex w-[100%] space-x-4 mt-4 mb-4">
          {props.ratedSongs.map((ratedSong) => (
            <Card
              cover={`data:image/png;base64,${ratedSong.song.album.cover}`}
              mainText={ratedSong.song.title}
              secText={ratedSong.song.album.artist.name}
              rating={ratedSong.rating}
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
