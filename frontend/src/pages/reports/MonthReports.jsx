import ReportsNavbar from "../../components/reportspage/reportsnavbar";
import { createComputed, createEffect, createSignal, useContext } from "solid-js";
import { UserContext } from "../../contexts/UserContext";
import { postData } from "../../getUserData";
import SongCol from "../../components/reportspage/subjectcol/songcol";
import ArtistCol from "../../components/reportspage/subjectcol/artistcol";
import AlbumCol from "../../components/reportspage/subjectcol/albumcol";

function MonthReports() {
    const [songs, setSongs] = createSignal(null);
    const [artists, setArtists] = createSignal(null);
    const [albums, setAlbums] = createSignal(null);
    const { user } = useContext(UserContext);

    const getSongs = async (id) => {
        const songsData = await postData("scrobbles/top-songs", {
            start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
            end: new Date(),
            id: id,
            pageNumber: 1,
            pageSize: 5
        });
        setSongs(songsData.songs);
    }

    const getArtists = async (id) => {
        const artistsData = await postData("scrobbles/top-artists", {
            start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
            end: new Date(),
            id: id,
            pageNumber: 1,
            pageSize: 5
        });
        setArtists(artistsData.artists);
    }

    const getAlbums = async (id) => {
        const albumsData = await postData("scrobbles/top-albums", {
            start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
            end: new Date(),
            id: id,
            pageNumber: 1,
            pageSize: 5
        });
        console.log(albumsData.albums);
        setAlbums(albumsData.albums);
    }

    createComputed(() => {
        if(!user()) return;
        console.log(user());
        getSongs(user().id);
        getArtists(user().id);
        getAlbums(user().id);
    });
    
    return (
        <div class="w-full overflow-y-auto">
            <div class="flex flex-col mx-auto w-[90%] bg-[#2b2d31] shadow-xl mt-5 rounded-md text-[#f2f3ea]">
                <h1 class="text-3xl font-bold">Reports</h1>
                <ReportsNavbar active="month" />
                <div class="grid grid-cols-1 xl:grid-cols-3 mb-2">
                    {songs() && <SongCol songs={songs()} />}
                    {artists() && <ArtistCol artists={artists()} />}
                    {albums() && <AlbumCol albums={albums()} />}
                </div>
            </div>
        </div>
    )
}

export default MonthReports;