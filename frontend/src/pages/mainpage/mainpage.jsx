import mainpagebanner from '../../assets/icons/mainpagebanner.jpg';
import logo from '../../assets/icons/logo-white.png';

function MainPage(){
    return(
        <div class="w-full bg-[#313338] text-[#f2f3ea]">
            {/* main banner */}
            <div 
                id="banner" 
                class="justify-center mx-auto my-2 p-2 rounded-md shadow-lg bg-[#2b2d31]"
            // style={`background-image: url(${mainpagebanner})`}
            >
                <div class="flex flex-row mx-auto justify-center items-center">
                    <h1 class="text-3xl mr-2">Trackify</h1>
                    <img class="w-12 h-12" src={logo}/>
                </div>
                <h2 class=" text-2xl">See most popular and liked music powered by users listening history</h2>
                <h2 class="text-xl">Connect Spotify account and track your history</h2>
                <h2 class="text-xl">Create your own charts and collages</h2>
                <button>Get Started</button>
            </div>


        </div>
    )
}

export default MainPage;