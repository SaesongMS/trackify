import { A } from "@solidjs/router"; 

function ProfileNavButton(props){
    const { title, destination, ...others } = props;
    return(
        <A href={destination} class="flex h-[100%] justify-center items-center pl-4 pr-4 hover:text-slate-400 hover:[text-shadow:_0_4px_4px_rgb(0_0_0_/_40%)] transition-all duration-150 ease-linear cursor-pointer">
            {title}
        </A>
    )
}

export default ProfileNavButton;