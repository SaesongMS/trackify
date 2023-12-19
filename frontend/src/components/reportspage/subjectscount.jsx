import { createEffect, createSignal } from "solid-js";
import { postData } from "../../getUserData";


function SubjectCount(props){
    const {start, end, userId } = props;
    const [songCount, setSongCount] = createSignal(null);
    const [artistCount, setArtistCount] = createSignal(null);
    const [albumCount, setAlbumCount] = createSignal(null);

    const getSubjectCount = async (id) => {
        const subjectCountData = await postData("reports/subjectsCount", {
            startdate: start,
            enddate: end,
            userid: id,
        });
        console.log(subjectCountData);
        setSongCount(subjectCountData.songCount);
        setArtistCount(subjectCountData.artistCount);
        setAlbumCount(subjectCountData.albumCount);
    }

    createEffect(() => {
        getSubjectCount(userId);
    });

    return(
        <div class="flex flex-col w-[80%] mt-2 mx-auto">
            <div class="text-2xl font-bold text-center">You listened to</div>
            <div class="flex flex-row w-full">
                <div class="flex flex-col w-1/3">
                    <div class="text-xl text-center">Songs</div>
                    <div class="text-lg text-center">{songCount()}</div>
                </div>
                <div class="flex flex-col w-1/3">
                    <div class="text-xl text-center">Artists</div>
                    <div class="text-lg text-center">{artistCount()}</div>
                </div>
                <div class="flex flex-col w-1/3">
                    <div class="text-xl text-center">Albums</div>
                    <div class="text-lg text-center">{albumCount()}</div>
                </div>
            </div>
        </div>
    )


}

export default SubjectCount;