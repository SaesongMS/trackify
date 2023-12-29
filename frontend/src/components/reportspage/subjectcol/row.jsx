
import { encodeSubjectName } from "../../../encodeSubjectName";
function Row(props){
    const {
        photo,
        textMain,
        textSecondary,
        index,
        type,
        typeSecondary,
        ...other
      } = props;
    
      const handleClick = (event, subject, name) => {
        event.preventDefault();
        if (subject !== "" && name !== "")
          window.location.href = `/${subject}/${encodeSubjectName(name)}`;
      };
    
    return(
        <div class=" border border-black mt-2">
            <div class="flex flex-row items-center">
            <p class="w-8">{index + 2}.</p>
            <img
                onClick={(event) => handleClick(event, type, textMain)}
                src={`data:image/png;base64,${photo}`}
                alt="cover"
                class="ml-1 md:ml-2 w-14 h-14 md:w-20 md:h-20 rounded-md cursor-pointer"
            />
            <div class="ml-3 flex flex-col mx-auto">
                <p
                onClick={(event) => handleClick(event, type, textMain)}
                class="mr-2 truncate w-28 sm:w-36 md:w-96 xl:w-56 cursor-pointer text-lg"
                >
                {textMain}
                </p>
                <p
                onClick={(event) =>
                    handleClick(event, typeSecondary, textSecondary)
                }
                class="mr-2 truncate w-28 sm:w-36 md:w-96 xl:w-56 cursor-pointer text-sm"
                >
                {textSecondary}
                </p>
            </div>
            </div>
        </div>
    )
}

export default Row;