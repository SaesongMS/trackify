function Comment(props) {
  const { avatar, username, comment, date, ...others } = props;
  return (
    <div class="flex w-[100%] h-[10%] border border-slate-800 rounded-sm hover:border-slate-500 transition-all duration-200">
      <img
        class="h-[100%] aspect-square mr-2"
        src={`data:image/png;base64,${avatar}`}
      />
      <div class="flex flex-grow">
        <div class="flex flex-col">
          <span class="mr-4 cursor-pointer">{username}</span>
          <span class="mr-4 cursor-pointer">{comment}</span>
        </div>
      </div>
      <div class="flex items-center">
        <span class="mr-4 cursor-pointer">options</span>
        <span class="mr-4 cursor-default">{date}</span>
      </div>
    </div>
  );
}

export default Comment;
