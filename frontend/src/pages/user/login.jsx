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
        <>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <input type="text" placeholder="Username" value={username()} onInput={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password()} onInput={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
        </>
    );
}

export default Login;