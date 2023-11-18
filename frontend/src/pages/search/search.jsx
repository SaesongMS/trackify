import { createSignal } from "solid-js";
import { getData } from "../../getUserData";
import SearchGrid from "../../components/searchpage/searchgrid";

function Search() {
  const [query, setQuery] = createSignal("");
  const [results, setResults] = createSignal({});
  const [isFound, setIsFound] = createSignal(true);
  const handleClick = async (e) => {
    e.preventDefault();
    if (query() === ""){
      return alert("Please enter a search query");
    } 
    const response = await getData(`search/${query()}`);
    setResults(response);
    checkResults();
  };

  const checkResults = () => {
    if(results().success){
      if (results().artists.length === 0 && results().albums.length === 0 && results().songs.length === 0 && results().users.length === 0) 
        setIsFound(false);
      else 
        setIsFound(true);
    }
    else
      setIsFound(false);
  }

  return (
    <div class="flex flex-col w-full overflow-scroll">
    <div class="w-[80%] mx-auto">
      <form onSubmit={handleClick} class="h-20 w-[80%] flex flex-row justify-center mx-auto">
        <input
          class="h-10 mt-3 flex-grow-0 flex-shrink-0 w-[80%] border border-slate-400 rounded-sm"
          onInput={(e) => setQuery(e.target.value)}
        />
        <button class="h-10 mt-3 ml-3 p-5 bg-slate-600 text-white rounded-md shadow-xl justify-center items-center flex">Search</button>
      </form>
        {!isFound() && <span class="text-xl mx-auto">No results found</span>}
        {results().artists && results().artists.length > 0 && (
            <SearchGrid subjects={results().artists} type="artist" />
        )}
        {results().albums && results().albums.length > 0 && (
            <SearchGrid subjects={results().albums} type="album" />
        )}
        {results().songs && results().songs.length > 0 && (
            <SearchGrid subjects={results().songs} type="song" />
        )}
        {results().users && results().users.length > 0 && (
            <SearchGrid subjects={results().users} type="user" />
        )}
    </div>
    </div>
  );
}

export default Search;
