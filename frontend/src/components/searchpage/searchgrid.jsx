import SearchCard from "./searchcard";

function SearchGrid(props) {
    const { subjects, type, ...others } = props;

    const renderCard = (subject) => {
        switch(type){
            case "artist":
                return <SearchCard photo={subject.photo} name={subject.name} subject="artist" />
            case "album":
                return <SearchCard photo={subject.cover} name={subject.name} subject="album" />
            case "song":
                return <SearchCard photo={subject.album.cover} name={subject.title} subject="song" />
            case "user":
                return <SearchCard photo={subject.profilePicture} name={subject.userName} subject="user" />
        }
    }

    return (
    <>
        <p class="text-2xl mt-5 mb-5 capitalize">{type}</p>
        <div class="w-full xl:w-[80%] mx-auto xl:mx-0">
            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-2">
            {subjects.map((subject) => (
                renderCard(subject)
            ))}
            </div>
        </div>
    </>
    );
}
export default SearchGrid;
