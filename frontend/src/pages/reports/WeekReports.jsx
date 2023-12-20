import ReportsNavbar from "../../components/reportspage/reportsnavbar";
import { createComputed, createEffect, createSignal, useContext } from "solid-js";
import { UserContext } from "../../contexts/UserContext";
import { postData } from "../../getUserData";
import SongCol from "../../components/reportspage/subjectcol/songcol";
import ArtistCol from "../../components/reportspage/subjectcol/artistcol";
import AlbumCol from "../../components/reportspage/subjectcol/albumcol";
import SubjectCount from "../../components/reportspage/subjectcount/subjectscount";
import Info from "../../components/reportspage/info/info";
import TopUsers from "../../components/reportspage/topusers";
import WeekGraph from "../../components/reportspage/graphs/weekgraph";

function WeekReports() {
    const [songs, setSongs] = createSignal(null);
    const [artists, setArtists] = createSignal(null);
    const [albums, setAlbums] = createSignal(null);
    const { user } = useContext(UserContext);
    const start = new Date(new Date().setDate(new Date().getDate() - 7));
    const end = new Date();
    const previousStart = new Date(new Date(start).setDate(new Date(start).getDate() - 7));
    const previousEnd = new Date(new Date(end).setDate(new Date(end).getDate() - 7));
    const interval = "week"

    const getSongs = async (id) => {
        const songsData = await postData("scrobbles/top-songs", {
            start: start,
            end: end,
            id: id,
            pageNumber: 1,
            pageSize: 5
        });
        setSongs(songsData.songs);
    }

    const getArtists = async (id) => {
        const artistsData = await postData("scrobbles/top-artists", {
            start: start,
            end: end,
            id: id,
            pageNumber: 1,
            pageSize: 5
        });
        setArtists(artistsData.artists);
    }

    const getAlbums = async (id) => {
        const albumsData = await postData("scrobbles/top-albums", {
            start: start,
            end: end,
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
                <div class="flex flex-col mx-2">
                    <ReportsNavbar active={interval} />
                    <div class="grid grid-cols-1 xl:grid-cols-3 lg:w-[85%] lg:mx-auto ">
                        {songs() && <SongCol songs={songs()} />}
                        {artists() && <ArtistCol artists={artists()} />}
                        {albums() && <AlbumCol albums={albums()} />}
                    </div>
                    {user() &&
                        <>
                            <SubjectCount start={start} end={end} previousStart={previousStart} previousEnd={previousEnd} interval={interval} userId={user().id} />
                            <Info start={start} end={end} previousStart={previousStart} previousEnd={previousEnd} userId={user().id} interval={interval} />
                            <TopUsers start={start} end={end} previousStart={previousStart} previousEnd={previousEnd} userId={user().id} />
                            <WeekGraph start={start} end={end} userId={user().id} />
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default WeekReports;