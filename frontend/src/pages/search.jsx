import { createSignal } from "solid-js";
import { getData } from "../getUserData";
import { A } from "@solidjs/router";
import Card from "../components/userpage/main/card";

function Search() {
  const [query, setQuery] = createSignal("");
  const [results, setResults] = createSignal([]);
  const handleClick = async (e) => {
    e.preventDefault();
    const response = await getData(`search/${query()}`);
    setResults(response);
  };

  return (
    <div>
      <div class="w-full h-20">
        <input
          class="h-10 mt-3 ml-3"
          onInput={(e) => setQuery(e.target.value)}
        />
        <button class="h-10 mt-3 ml-3" onClick={handleClick}>
          Sent query
        </button>
      </div>
      <div>
        {results() && results().length > 0 && (
          <>
            <span>Results:</span>
            <br />
            Users
          </>
        )}
        {results() &&
          results().users &&
          results().users.map((user) => (
            <>
              <A href={`/user/${user.userName}/main`}>
                {user.userName}
                <img
                  src={`data:image/png;base64,${user.profilePicture}`}
                  class="w-20 h-20"
                  alt={user.userName}
                />
              </A>
            </>
          ))}
        {results() && results().users && results().users.length === 0 && (
          <span>No users found</span>
        )}
        {results() && results().length > 0 && (
          <>
            <br />
            Songs
          </>
        )}
        {results() &&
          results().songs &&
          results().songs.map((song) => (
            <>
              <span>{song.title}</span>
              <span>{song.album.artist.name}</span>
              <img
                src={`data:image/png;base64,${song.album.cover}`}
                class="h-20"
              />
            </>
          ))}
        {results() && results().songs && results().songs.length === 0 && (
          <span>No songs found</span>
        )}
        {results() && results().length > 0 && (
          <>
            <br />
            Albums
          </>
        )}
        {results() &&
          results().albums &&
          results().albums.map((album) => (
            <>
              <span>{album.name}</span>
              <span>{album.artist.name}</span>
              <img src={`data:image/png;base64,${album.cover}`} class="h-20" />
            </>
          ))}
        {results() && results().albums && results().albums.length === 0 && (
          <span>No albums found</span>
        )}
        {results() && results().length > 0 && (
          <>
            <br />
            Artists
          </>
        )}
        {results() &&
          results().artists &&
          results().artists.map((artist) => (
            <>
              <span>{artist.name}</span>
              <img src={`data:image/png;base64,${artist.photo}`} class="h-20" />
            </>
          ))}
        {results() && results().artists && results().artists.length === 0 && (
          <span>No artists found</span>
        )}
      </div>
    </div>
  );
}

export default Search;
