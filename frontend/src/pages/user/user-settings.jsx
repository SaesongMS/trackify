import { createEffect, createSignal, useContext } from "solid-js";
import { UserContext } from "../../contexts/UserContext";
import { getData, patchData } from "../../getUserData";

function UserSettings() {
  const { user } = useContext(UserContext);
  const [bio, setBio] = createSignal("");
  const [oldBio, setOldBio] = createSignal("");
  const [avatar, setAvatar] = createSignal(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  createEffect(async () => {
    if (user()) {
      const data = await getData(`users/${user().userName}`);
      setOldBio(data.description ? data.description : "");
    }
  });

  const handleEditProfile = async (e) => {
    e.preventDefault();
    if (avatar() || (bio() !== oldBio() && bio().trim() !== "")) {
      const response = await patchData(`users/${user().userName}`, {
        bio: bio() ? bio() : oldBio(),
        avatar: avatar() ? avatar() : "",
      });
      if (response.success) alert("Profile edited!");
      else console.log(response.message);
    } else alert("No changes made!");
  };

  return (
    <div class="mt-2 ml-2">
      <form onsubmit={handleEditProfile}>
        <h1 class="text-2xl">User Settings</h1>
        <h2 class="text-xl">Description:</h2>
        <input
          type="text"
          value={oldBio()}
          onInput={(e) => setBio(e.target.value)}
        />
        <br />
        <h2 class="text-xl">Avatar:</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <br />
        <input
          type="submit"
          value="Edit"
          class="p-1 border mt-1 ml-1 px-4 hover:cursor-pointer hover:bg-slate-700 hover:text-slate-100"
        />
      </form>
    </div>
  );
}

export default UserSettings;
