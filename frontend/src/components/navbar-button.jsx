import { A } from "@solidjs/router"; 

function NavbarButton(props){
    const { image, destination, ...others } = props;
    return(
    <A href={destination}  class="relative flex items-center justify-center h-16 w-16 mt-2 mb-2 mx-auto shadow-lg bg-slate-500 rounded-[30px] hover:rounded-xl transition-all duration-300 ease-linear cursor-pointer">
        <img src={image} />
    </A>
    )
}

export default NavbarButton;