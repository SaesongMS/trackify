import { createEffect, createSignal, useContext } from "solid-js";
import { UserContext } from "../../../contexts/UserContext";
import { postData } from "../../../getUserData";

function UserSettingsPassword() {
  const { user } = useContext(UserContext);
  const [oldPassword, setOldPassword] = createSignal("");
  const [newPassword, setNewPassword] = createSignal("");
  const [confirmNewPassword, setConfirmNewPassword] = createSignal("");
  const [error, setError] = createSignal("");

  createEffect(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (user() == null) {
      window.location.href = "/login";
    }
  });

  const handleChangePassword = async (event) => {
    event.preventDefault();
    if (passwordMatch()) {
      const res = await postData("users/change-password", {
        oldPassword: oldPassword(),
        newPassword: newPassword(),
      });
      if (res.success) {
        alert("Password changed successfully");
        window.location.href = "/user/settings";
      } else {
        setError(res.message);
      }
    }
  };

  const passwordMatch = () => {
    if (oldPassword() === newPassword()) {
      setError("New password cannot be the same as old password");
      return false;
    }
    if (newPassword() !== confirmNewPassword()) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  return (
    <div class="flex flex-col justify-center items-center w-full">
      <span class="text-2xl font-bold text-white pb-1">Change Password</span>
      <form class="flex flex-col space-y-2" onSubmit={handleChangePassword}>
        <input
          type="password"
          placeholder=" Old Password"
          class="focus:outline-none bg-[#313338] text-slate-200 border-b-2 border-slate-300"
          value={oldPassword()}
          onInput={(e) => setOldPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder=" New Password"
          class="focus:outline-none bg-[#313338] text-slate-200 border-b-2 border-slate-300"
          value={newPassword()}
          onInput={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder=" Confirm New Password"
          class="focus:outline-none bg-[#313338] text-slate-200 border-b-2 border-slate-300"
          value={confirmNewPassword()}
          onInput={(e) => setConfirmNewPassword(e.target.value)}
          required
        />
        <span class="text-red-500 max-w-[200px]">{error()}</span>
        <input
          type="submit"
          value="Confirm"
          class="p-1 border px-4 hover:cursor-pointer hover:bg-slate-700 text-white hover:text-slate-100 max-w-[200px]"
        />
      </form>
    </div>
  );
}

export default UserSettingsPassword;
