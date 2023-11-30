import { encodeSubjectName } from "../../encodeSubjectName";
function SearchCard(props) {
  const { photo, name, secondname, subject, ...others } = props;

  const handleClick = (e) => {
    e.preventDefault();
    console.log(subject);
    if (subject === "user") {
      window.location.href = `/${subject}/${name}/main`;
      return;
    }
    window.location.href = `/${subject}/${encodeSubjectName(name)}`;
  };

  return (
    <div class="relative mx-auto cursor-pointer" onClick={handleClick}>
      <img
        src={`data:image/png;base64,${photo}`}
        alt={subject}
        class="rounded-md w-full h-full aspect-square"
      />
      <div class="text-white text-lg font-bold shadow-md absolute bottom-0 bg-black bg-opacity-50 rounded-b-md w-full flex justify-center items-center">
        {name}
        {secondname && <span class="text-sm ml-2">{secondname}</span>}
      </div>
    </div>
  );
}
export default SearchCard;
