import { createComputed, createEffect, createSignal } from "solid-js"
import { getData, postData } from "../../getUserData"
import calendar from '../../assets/icons/calendar.svg'
import ChartsRow from "../../components/chartspage/chartsrow"
import ChartsCol from "../../components/chartspage/chartscol"

function Charts() {
    
    //#region Popular
    const [popularSongs, setPopularSongs] = createSignal([])
    const [popularAlbums, setPopularAlbums] = createSignal([])
    const [popularArtists, setPopularArtists] = createSignal([])
    const [popularInterval, setPopularInterval] = createSignal("week")
    const [isOpen, setIsOpen] = createSignal(false)

    const handleSelect = (interval) => {
        console.log("before-prop : "+interval)
        console.log("before: "+popularInterval())
        setPopularInterval(interval);
        setIsOpen(false);
        console.log("after: "+popularInterval())
    };

    const getInterval = (interval) => {
        switch(interval){
            case "day":
                return new Date(new Date().setDate(new Date().getDate() - 1))
            case "week":
                return new Date(new Date().setDate(new Date().getDate() - 7))
            case "month":
                return new Date(new Date().setMonth(new Date().getMonth() - 1))
            case "year":
                return new Date(new Date().setFullYear(new Date().getFullYear() - 1))
            default:
                return new Date(new Date().setDate(new Date().getDate() - 7))
        }
    }
    
    const getPopularSongs = async (i) => {
        setPopularSongs([])
        const interval = getInterval(i)
        const response = await postData("scrobbles/top-songs-all", {start: interval, end: new Date(), n:10})
        setPopularSongs(response.songs)
    }

    const getPopularAlbums = async (i) => {
        setPopularAlbums([])
        const interval = getInterval(i)
        const response = await postData("scrobbles/top-albums-all", {start: interval, end: new Date(), n:10})
        setPopularAlbums(response.albums)
    }

    const getPopularArtists = async (i) => {
        setPopularArtists([])
        console.log(i)
        const interval = getInterval(i)
        console.log(interval)
        console.log(new Date())
        const response = await postData("scrobbles/top-artists-all", {start: interval, end: new Date(), n:10})
        setPopularArtists(response.artists)
        console.log(response.artists)
        console.log(popularArtists())
    }

    createComputed(() => getPopularSongs(popularInterval()))
    createComputed(() => getPopularAlbums(popularInterval()))
    createComputed(() => getPopularArtists(popularInterval()))

    let ref = null;

    // createEffect(() => {
    //     function handleClickOutside(event) {
    //         if (isOpen && ref && !ref.contains(event.target)) {
    //             setIsOpen(false);
    //         }
    //     }
    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // });


    //#endregion

    //#region Liked
    const [likedSongs, setLikedSongs] = createSignal([])

    const getLikedSongs = async () => {
        const response = await getData("favourite-song/most-liked")
        setLikedSongs(response.favouriteSongs)
    }

    createEffect(() => {
        getLikedSongs()
    }, [])

    //#endregion

    //#region Rated
    const [ratedSongs, setRatedSongs] = createSignal([])
    const [ratedAlbums, setRatedAlbums] = createSignal([])
    const [ratedArtists, setRatedArtists] = createSignal([])

    const getRatedSongs = async () => {
        const response = await postData("ratings/highest-rated-songs", {n:10})
        setRatedSongs(response.averageRatedSongs)
    }

    const getRatedAlbums = async () => {
        const response = await postData("ratings/highest-rated-albums", {n:10})
        setRatedAlbums(response.averageRatedAlbums)
    }

    const getRatedArtists = async () => {
        const response = await postData("ratings/highest-rated-artists", {n:10})
        setRatedArtists(response.averageRatedArtists)
    }

    createEffect(() => {
        getRatedSongs()
        getRatedAlbums()
        getRatedArtists()
    }, [])

    //#endregion
  
    return (
        <div class="flex flex-col overflow-y-auto w-full">
            {/* #region Liked*/}
            <div class="bg-slate-500 shadow-xl mt-5 rounded-md w-[80%] mx-auto">
                <div class="mt-5 w-[80%] mx-auto">
                    <div class="flex flex-row justify-between">
                        <h1 class="text-2xl font-bold">Most popular</h1>
                        <div class="relative">
                            <button onClick={() => setIsOpen(!isOpen())} ref={ref} class="h-10 ml-auto p-5 justify-center items-center flex hover:underline">
                                <span class="mr-2 text-lg capitalize font-bold">{popularInterval}</span>
                                <img src={calendar} alt="calendar" class="w-6 h-6" />
                            </button>
                            {isOpen() && (
                            <div class="absolute right-0 w-24 bg-white border rounded shadow-xl">
                                <button onClick={() => handleSelect('day')} class="w-full text-center block px-4 py-1 text-sm text-gray-700 hover:bg-slate-600 hover:text-white">Day</button>
                                <button onClick={() => handleSelect('week')} class="w-full text-center block px-4 py-1 text-sm text-gray-700 hover:bg-slate-600 hover:text-white">Week</button>
                                <button onClick={() => handleSelect('month')} class="w-full text-center block px-4 py-1 text-sm text-gray-700 hover:bg-slate-600 hover:text-white">Month</button>
                                <button onClick={() => handleSelect('year')} class="w-full text-center block px-4 py-1 text-sm text-gray-700 hover:bg-slate-600 hover:text-white">Year</button>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-1 lg:gap-6 p-5">
                    <div>
                        {popularSongs().length>0 && (
                            <ChartsCol subjects={popularSongs()} type="songs" />
                        )}
                    </div>
                    <div>
                        {popularAlbums().length>0 && (
                            <ChartsCol subjects={popularAlbums()} type="albums" />
                        )}
                    </div>
                    <div>
                        {popularArtists().length>0 && (
                            <ChartsCol subjects={popularArtists()} type="artists" />
                        )}
                    </div>
                </div>
            </div>
            {/* #endregion */}
        </div>
  );
}

export default Charts;