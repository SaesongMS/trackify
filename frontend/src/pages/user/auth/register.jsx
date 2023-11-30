import { A, useNavigate } from "@solidjs/router";
import { createEffect, createSignal, useContext } from "solid-js";
import { postData } from "../../../getUserData";
import { UserContext } from "../../../contexts/UserContext";

function Register() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [passwordConfirm, setPasswordConfirm] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [error, setError] = createSignal("");

  const passwordMatch = () => {
    return password() === passwordConfirm();
  };
  const handleRegister = async (event) => {
    event.preventDefault();
    if (passwordMatch()) {
      const res = await postData("users/register", {
        email: email(),
        username: username(),
        password: password(),
        confirmPassword: passwordConfirm(),
      });
      if (res.success) {
        const res2 = await postData("users/login", {
          username: username(),
          password: password(),
        });
        localStorage.setItem("user", username());
        setUser({ userName: username(), id: res2.id });
        navigate(`/user/${username()}/main`);
      }else{
        setError(res.message);
        document.getElementById("error").classList.remove("hidden");
      }
    }else{
      setError("Passwords do not match");
      document.getElementById("error").classList.remove("hidden");
    }
  };

  createEffect(() => {
    if (user() !== null) {
      navigate(`/user/${user().userName}/main`);
    }
  });
  return (
    <div class="flex h-[100%] w-[100%] items-center justify-center text-slate-100">
      <div class="flex flex-col items-center space-y-4">
        <h1 class="font-bold text-2xl">Register</h1>

        <form
          class="flex flex-col space-y-4 items-center"
          onSubmit={handleRegister}
        >
          <input
            class="text-slate-700 pl-2 pr-2 rounded"
            type="email"
            placeholder="Email"
            value={email()}
            onInput={(e) => setEmail(e.target.value)}
            required
          />
          <input
            class="text-slate-700 pl-2 pr-2 rounded"
            type="text"
            placeholder="Username"
            value={username()}
            onInput={(e) => setUsername(e.target.value)}
            required
          />
          <input
            class="text-slate-700 pl-2 pr-2 rounded"
            type="password"
            placeholder="Password"
            value={password()}
            onInput={(e) => setPassword(e.target.value)}
            required
          />
          <input
            class="text-slate-700 pl-2 pr-2 rounded"
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirm()}
            onInput={(e) => setPasswordConfirm(e.target.value)}
            required
          />
          <span id="error" class="text-red-500 my-0 p-0 hidden">{error()}</span>
          <A class="text-white" href="/login">
            Already have an account? Login here!
          </A>
          <button
            class="border border-slate-700 w-fit pt-1 pb-1 pl-4 pr-4 rounded bg-slate-500"
            type="submit"
          >
            Sign up!
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
