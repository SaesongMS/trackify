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
    setResults({}); 
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
    <div class="flex flex-col w-full overflow-y-auto mb-3 text-[#f2f3ea]">
    <div class="w-[80%] mx-auto">
      <form onSubmit={handleClick} class="h-20 w-[80%] flex flex-row justify-center mx-auto">
        <input
          class="h-10 mt-3 flex-grow-0 flex-shrink-0 w-[80%] border text-[#f2f3ea] border-[#3f4147] bg-[#3f4147] rounded-sm"
          onInput={(e) => setQuery(e.target.value)}
        />
        <button class="h-10 mt-3 ml-3 p-5 border border-[#3f4147] hover:border-slate-500 transition-all duration-200 text-[#f2f3ea] hover:rounded-sm shadow-xl justify-center items-center flex">Search</button>
      </form>
        {!isFound() && <span class="text-xl flex justify-center text-[#f2f3ea]">No results found</span>}
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
