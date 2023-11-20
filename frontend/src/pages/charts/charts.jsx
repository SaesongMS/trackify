import { createComputed, createEffect, createRenderEffect, createSignal } from "solid-js"
import { getData, postData } from "../../getUserData"
import calendar from '../../assets/icons/calendar.svg'
import ChartsCol from "../../components/chartspage/chartscol"
import ChartsRow from "../../components/chartspage/chartsrow"
import SearchCard from "../../components/searchpage/searchcard"

function Charts() {
    
    //#region Popular
    const [popularSongs, setPopularSongs] = createSignal([])
    const [popularAlbums, setPopularAlbums] = createSignal([])
    const [popularArtists, setPopularArtists] = createSignal([])
    const [popularInterval, setPopularInterval] = createSignal("week")
    const [isOpen, setIsOpen] = createSignal(false)

    const handleSelect = (interval) => {
        setPopularInterval(interval);
        setIsOpen(false);
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
        const interval = getInterval(i)
        const response = await postData("scrobbles/top-artists-all", {start: interval, end: new Date(), n:10})
        setPopularArtists(response.artists)
    }

    // createRenderEffect(() => {
    //     getPopularSongs(popularInterval())
    //     getPopularAlbums(popularInterval())
    //     getPopularArtists(popularInterval())
    // })

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
    })

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

    // createRenderEffect(() => {
    //     getRatedSongs()
    //     getRatedAlbums()
    //     getRatedArtists()
    // })

    //#endregion
  
    return (
        <>
            <div class="flex flex-col overflow-y-auto w-full">
                {/* <div class="flex flex-row justify-between items-center w-[80%] mx-auto">
                    <a href="#liked" class="text-lg font-bold hover:underline">Jump to Most Liked</a>
                    <a href="#rated" class="text-lg font-bold hover:underline">Jump to Top Rated</a>
                </div> */}
                <section id="popular">
                    <div class="bg-[#2b2d31] text-[#f2f3ea] shadow-xl mt-5 rounded-md w-[80%] mx-auto">
                        <div class="mt-5 pt-5 w-[80%] mx-auto">
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
                </section>
                <section id="liked">
                    <div class="bg-[#2b2d31] text-[#f2f3ea] shadow-xl mt-5 rounded-md w-[80%] mx-auto">
                        <div class="mt-5 w-[80%] mx-auto">
                            <h1 class="text-2xl font-bold flex">Most liked songs</h1>
                        </div>
                        {likedSongs().length>0 &&
                        <>
                            <div class="my-5 flex flex-col md:flex-row xl:justify-center xl:items-center xl:mx-auto">
                                <p class="w-8 text-xl font-bold">1.</p>
                                <img onClick={(event) => handleClick(event, type, textMain)} src={`data:image/png;base64,${likedSongs()[0].song.album.cover}`} alt="cover" class="mx-auto md:mr-0 md:ml-2 w-32 h-32 rounded-md cursor-pointer" />
                                <div class="ml-3 flex flex-col">
                                    <p onClick={(event) => handleClick(event, type, textMain)} class="mr-2 truncate w-72 lg:w-56 xl:w-60 font-bold cursor-pointer">{likedSongs()[0].song.title}</p>
                                    <p onClick={(event) => handleClick(event, typeSecondary, textSecondary)} class="mr-2 truncate w-72 lg:w-56 xl:w-60 cursor-pointer">{likedSongs()[0].song.album.artist.name}</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-1 xl:grid-cols-3 mt-5">
                                
                                    {likedSongs().slice(1).map((song, index) => (
                                        <ChartsRow photo={song.song.album.cover} textMain={song.song.title} textSecondary={song.song.album.artist.name} type={"song"} typeSecondary={"artist"} index={index+1} />
                                    ))}
                            </div>
                        </>
                        }
                    </div>
                </section>
                {/* <section id="liked2">
                    <div class="bg-slate-500 shadow-xl mt-5 rounded-md w-[80%] mx-auto">
                        <div class="mt-5 w-[80%] mx-auto">
                            <h1 class="text-2xl font-bold flex justify-center items-center">Most liked songs</h1>
                        </div>
                        <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
                            {likedSongs().length>0 && 
                                likedSongs().map((subject) => (
                                    <div class="mt-5 w-[80%] h-[80%] mx-auto">
                                        <SearchCard photo={subject.song.album.cover} name={subject.song.title} subject="song" />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </section> */}
                <section id="rated" class="mb-10">
                <div class="bg-[#2b2d31] text-[#f2f3ea] shadow-xl mt-5 rounded-md w-[80%] mx-auto">
                        <div class="mt-5 w-[80%] mx-auto">
                            <div class="flex flex-row justify-between">
                                <h1 class="text-2xl font-bold">Top rated</h1>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-1 lg:gap-6 p-5">
                            <div>
                                {ratedSongs().length>0 && (
                                    <ChartsCol subjects={ratedSongs()} type="songs" />
                                )}
                            </div>
                            <div>
                                {ratedAlbums().length>0 && (
                                    <ChartsCol subjects={ratedAlbums()} type="albums" />
                                )}
                            </div>
                            <div>
                                {ratedArtists().length>0 && (
                                    <ChartsCol subjects={ratedArtists()} type="artists" />
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
  );
}

export default Charts;