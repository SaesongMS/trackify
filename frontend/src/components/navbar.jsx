import NavbarButton from "./navbar-button";
import AppLogo from "../assets/icons/logo.png";
import SearchIcon from "../assets/icons/search.svg";
import UserIcon from "../assets/icons/user.png";
import ChartsIcon from "../assets/icons/charts.png";


function Navbar(){
    return (
        <div class="flex flex-col w-20 sticky top-0 bg-slate-600 shadow-lg">
            
                <NavbarButton destination="/" image={AppLogo} />
                <NavbarButton destination="/search" image={SearchIcon} />
                <NavbarButton destination="/charts" image={ChartsIcon} />
                <NavbarButton destination="/user/" image={UserIcon} />
            
            



        </div>
    )

}

export default Navbar;