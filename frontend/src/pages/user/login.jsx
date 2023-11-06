import { createSignal, useContext } from "solid-js";
import { getData, postData } from "../../getUserData";
import { useNavigate } from "@solidjs/router";
import { UserContext } from "../../contexts/UserContext";

function Login() {
    const [username, setUsername] = createSignal("");
    const [password, setPassword] = createSignal("");
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log(username(), password());
        const res = await postData("users/login", { username: username(), password: password() });
        if(res.success){
            localStorage.setItem("user", username());
            setUser(username());
            navigate(`/user/${username()}/main`);
        }
    };

    return (
        <div class="flex h-[100%] w-[100%] items-center justify-center text-slate-100">
            <div class="flex flex-col items-center space-y-4">
                <h1 class="font-bold text-2xl">Login</h1>

                <form class="flex flex-col space-y-4 items-center" onSubmit={handleLogin}>
                    <input class="text-slate-700 pl-2 pr-2 rounded" type="text" placeholder="Username" value={username()} onInput={(e) => setUsername(e.target.value)} />
                    <input class="text-slate-700 pl-2 pr-2 rounded" type="password" placeholder="Password" value={password()} onInput={(e) => setPassword(e.target.value)} />
                    <button class="border border-slate-700 w-fit pt-1 pb-1 pl-4 pr-4 rounded bg-slate-500" type="submit">Go!</button>
                </form>
            </div>
        </div>

    );
}

export default Login;