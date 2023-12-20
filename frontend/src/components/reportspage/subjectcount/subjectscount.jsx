import { createEffect, createSignal } from "solid-js";
import { postData } from "../../../getUserData";
import SubjectCountCard from "./subjectcountcard";

function SubjectCount(props){
    const {start, end, userId, previousStart, previousEnd, interval } = props;
    //log props
    console.log(props);
    const [songCount, setSongCount] = createSignal(0);
    const [artistCount, setArtistCount] = createSignal(0);
    const [albumCount, setAlbumCount] = createSignal(0);
    const [previousSongCount, setPreviousSongCount] = createSignal(0);
    const [previousArtistCount, setPreviousArtistCount] = createSignal(0);
    const [previousAlbumCount, setPreviousAlbumCount] = createSignal(0);

    const getSubjectCount = async (id) => {
        const subjectCountData = await postData("reports/subjectsCount", {
            startdate: start,
            enddate: end,
            userid: id,
        });
        setSongCount(subjectCountData.songCount);
        setArtistCount(subjectCountData.artistCount);
        setAlbumCount(subjectCountData.albumCount);
    }

    const getPreviousSubjectCount = async (id) => {
        const previousSubjectCountData = await postData("reports/subjectsCount", {
            startdate: previousStart,
            enddate: previousEnd,
            userid: id,
        });
        setPreviousSongCount(previousSubjectCountData.songCount);
        setPreviousArtistCount(previousSubjectCountData.artistCount);
        setPreviousAlbumCount(previousSubjectCountData.albumCount);  
    }

    createEffect(() => {
        getSubjectCount(userId);
        getPreviousSubjectCount(userId);
    });

    return(
        <div class="flex flex-col mt-2">
            <p class="text-2xl font-bold text-center">You listened to</p>
            <hr class="border-2 border-slate-300 opacity-30 w-1/2 mx-auto mb-2"/>
            <div class="grid grid-cols-1 md:grid-cols-3 lg:w-[85%] lg:mx-auto">
                <SubjectCountCard subject="Songs" interval={interval} count={songCount()} prevCount={previousSongCount()} />
                <SubjectCountCard subject="Artists" interval={interval} count={artistCount()} prevCount={previousArtistCount()} />
                <SubjectCountCard subject="Albums" interval={interval} count={albumCount()} prevCount={previousAlbumCount()} />
            </div>
        </div>
    )


}

export default SubjectCount;