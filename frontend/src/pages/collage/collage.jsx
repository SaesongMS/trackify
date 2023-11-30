import { createEffect, createSignal, useContext } from "solid-js";
import { postData } from "../../getUserData";
import calendar from "../../assets/icons/calendar.svg";
import { UserContext } from "../../contexts/UserContext";

function Collage() {
  const [collage, setCollage] = createSignal(null);
  const [popularInterval, setPopularInterval] = createSignal("week");
  const [isOpen, setIsOpen] = createSignal(false);
  const [size, setSize] = createSignal(4);
  const [subject, setSubject] = createSignal("artists");
  const subjects = ["artists", "albums", "tracks"];
  const { user } = useContext(UserContext);

  createEffect(async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    if (!user()) window.location.href = "/login";
  });

  const handleSelectChange = (e) => {
    setSize(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("The button was clicked.");
    const response = await postData("scrobbles/collage", {
      start: getInterval(popularInterval()),
      size: size(),
      subject: subject(),
    });
    setCollage(response.collage);
    console.log(response);
  };

  const handleDownload = (e) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${collage()}`;
    link.download = "collage.png";
    link.click();
  };

  const getInterval = (interval) => {
    switch (interval) {
      case "day":
        return new Date(new Date().setDate(new Date().getDate() - 1));
      case "week":
        return new Date(new Date().setDate(new Date().getDate() - 7));
      case "month":
        return new Date(new Date().setMonth(new Date().getMonth() - 1));
      case "year":
        return new Date(new Date().setFullYear(new Date().getFullYear() - 1));
      default:
        return new Date(new Date().setDate(new Date().getDate() - 7));
    }
  };

  let ref = null;

  const handleSelect = (interval) => {
    setPopularInterval(interval);
    setIsOpen(false);
  };

  return (
    <div class="w-full h-full text-white overflow-y-auto">
      Size:
      <select
        class="border px-2 ml-2 mt-2 hover:bg-slate-600 mb-5 text-black"
        onInput={handleSelectChange}
        value={size()}
      >
        <option value="4">2x2</option>
        <option value="9">3x3</option>
        <option value="16">4x4</option>
      </select>
      <br />
      Subject:
      <select
        class="border px-2 ml-2 mt-2 hover:bg-slate-600 mb-5 text-black"
        onInput={handleSubjectChange}
        value={subject()}
      >
        <option value="artists">Artists</option>
        <option value="albums">Albums</option>
        <option value="songs">Tracks</option>
      </select>
      <div class="relative">
        <button
          onClick={() => setIsOpen(!isOpen())}
          ref={ref}
          class="h-10 p-5 justify-center items-center flex hover:underline"
        >
          <span class="mr-2 text-lg capitalize font-bold">
            {popularInterval}
          </span>
          <img src={calendar} alt="calendar" class="w-6 h-6" />
        </button>
        {isOpen() && (
          <div class="absolute w-24 bg-white border rounded shadow-xl">
            <button
              onClick={() => handleSelect("day")}
              class="w-full text-center block px-4 py-1 text-sm text-gray-700 hover:bg-slate-600 hover:text-white"
            >
              Day
            </button>
            <button
              onClick={() => handleSelect("week")}
              class="w-full text-center block px-4 py-1 text-sm text-gray-700 hover:bg-slate-600 hover:text-white"
            >
              Week
            </button>
            <button
              onClick={() => handleSelect("month")}
              class="w-full text-center block px-4 py-1 text-sm text-gray-700 hover:bg-slate-600 hover:text-white"
            >
              Month
            </button>
            <button
              onClick={() => handleSelect("year")}
              class="w-full text-center block px-4 py-1 text-sm text-gray-700 hover:bg-slate-600 hover:text-white"
            >
              Year
            </button>
          </div>
        )}
      </div>
      <button
        class="border px-2 ml-2 mt-2 hover:bg-slate-600 mb-5"
        onClick={(e) => handleClick(e)}
      >
        Generate collage
      </button>
      {collage() && (
        <>
          <img
            src={`data:image/png;base64,${collage()}`}
            alt="collage"
            class="ml-2 w-[40%]"
          />

          <button onClick={(e) => handleDownload(e)}>Download</button>
        </>
      )}
    </div>
  );
}

export default Collage;
