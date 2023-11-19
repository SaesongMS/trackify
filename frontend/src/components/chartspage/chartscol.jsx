import ChartsRow from "./chartsrow";

function ChartsCol(props){
    const {subjects, type, ...others} = props;


    const renderList = (subject, index) => {
        switch(type){
            case "songs":
                return <ChartsRow photo={subject.song.album.cover} textMain={subject.song.title} textSecondary={subject.song.album.artist.name} type={"song"} typeSecondary={"artist"} index={index} />
            case "albums":
                return <ChartsRow photo={subject.album.cover} textMain={subject.album.name} textSecondary={subject.album.artist.name} type={"album"} typeSecondary={"artist"} index={index} />
            case "artists":
                return <ChartsRow photo={subject.artist.photo} textMain={subject.artist.name} textSecondary={""} type={"artist"} index={index} />
        }
    }

    return(
        <>
            <div class="mt-5">
                <h1 class="text-xl font-bold text-center capitalize">{type}</h1>
                <div class="mt-5">
                    {subjects.map((subject, index) => (
                        renderList(subject, index)
                    ))}
                </div>
            </div>
        </>
    );

}

export default ChartsCol;