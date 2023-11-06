import NavbarButton from "./navbar-button";
import AppLogo from "../assets/icons/logo.png";
import SearchIcon from "../assets/icons/search.svg";
import UserIcon from "../assets/icons/user.png";
import ChartsIcon from "../assets/icons/charts.png";
import { getData, postData } from "../getUserData";
import { createEffect, createSignal, useContext } from "solid-js";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "@solidjs/router";

function Navbar(){

    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const authorize = async () => {
        const response = await getData("users/user");
        if(response.success){
            setUser(localStorage.getItem("user"));
            console.log("set user:",user());
            return true;
        }
        localStorage.removeItem("user");
    }

    const handleLogout = async () => {
        localStorage.removeItem("user");
        const response = await postData("users/logout");
        console.log(response);
        navigate("/");
        setUser(null);
    }

    createEffect(() => {
        authorize();
        console.log(user());
    });

    return (
        <div class="flex flex-col w-20 sticky top-0 bg-slate-700 shadow-lg">
            <div class="flex flex-grow flex-col">

                <NavbarButton destination="/" image={AppLogo} />
                <NavbarButton destination="/search" image={SearchIcon} />
                <NavbarButton destination="/charts" image={ChartsIcon} />
            </div>
            <div class="flex flex-col">
                {user() && (
                    <>
                        <button onclick={handleLogout} class="relative flex items-center justify-center h-16 w-16 mt-2 mb-2 mx-auto shadow-lg bg-slate-500 rounded-[30px] hover:rounded-xl transition-all duration-200 ease-linear cursor-pointer">Logout</button>
                        <NavbarButton destination={`/user/${user()}/main`} image={UserIcon} />
                    </>
                )}
                {!user() && (
                    <NavbarButton destination="/login" image={UserIcon} />
                )}
            </div>
            



        </div>
    )

}

export default Navbar;