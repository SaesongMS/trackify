import NavbarButton from "./navbar-button";
import AppLogo from "../assets/icons/logo.png";
import SearchIcon from "../assets/icons/search.svg";
import UserIcon from "../assets/icons/user.png";
import ChartsIcon from "../assets/icons/charts.png";


function Navbar(){
    return (
        <div class="flex flex-col w-20 sticky top-0 bg-slate-700 shadow-lg">
            <div class="flex flex-grow flex-col">

                <NavbarButton destination="/" image={AppLogo} />
                <NavbarButton destination="/search" image={SearchIcon} />
                <NavbarButton destination="/charts" image={ChartsIcon} />
            </div>
            <div class="flex flex-col">
                <NavbarButton destination="/user/main" image={UserIcon} />
            </div>
            



        </div>
    )

}

export default Navbar;