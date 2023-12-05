import mainpagebanner from '../../assets/icons/mainpagebanner.jpg';
import logo from '../../assets/icons/logo-animated.gif';
import { A } from "@solidjs/router";
import { createEffect } from 'solid-js';
import { createSignal } from 'solid-js';
import { getData } from '../../getUserData';

function MainPage(){
    const [topProfiles, setTopProfiles] = createSignal(null);
    const [globalScrobbleCount, setGlobalScrobbleCount] = createSignal(null);

    createEffect(async () => {
        const topProfilesData = await getData("users/most-active");
        setTopProfiles(topProfilesData);
    });

    createEffect(async () => {
        const globalScrobbleCountData = await getData("scrobbles/count");
        setGlobalScrobbleCount(globalScrobbleCountData);
    });

    return(
        <div class="w-full flex flex-col bg-[#313338] text-[#f2f3ea]">
            {/* main banner */}
            <div 
                id="banner" 
                class="justify-center  my-2 p-2 rounded-md shadow-lg text-center bg-[#2b2d31]"
            // style={`background-image: url(${mainpagebanner})`}
            >
                <div class="flex flex-row mx-auto justify-center items-center">
                    <h1 class="text-3xl mr-2">Trackify</h1>
                    <img class="w-12 h-12" src={logo}/>
                </div>
                <h2 class="mt-2 text-2xl">See most popular and liked music powered by users listening history</h2>
                <h2 class="text-xl">Connect Spotify account and track your history</h2>
                <h2 class="text-xl mb-4">Create your own charts and collages</h2>
                <A href="/register" class="border border-[#f2f3ea] px-2 py-1 rounded-xl hover:shadow-inner hover:text-[#2b2d31] hover:bg-[#f2f3ea] transition-all duration-150">Get Started</A>
            </div>
            <div class="flex">
                <div class="w-1/2 px-4 py-4 flex flex-col flex-grow">
                    <span class="text-xl">Top users</span>
                    <table class="mt-4 border-spacing-2 border-separate">
                        {topProfiles()!=null && topProfiles().map((profile) => {
                            return(
                                    <tr class="">
                                        <td><A href={`/user/${profile.userName}/main`} class="w-12 h-12"><img class="w-12 aspect-square" src={`data:image/png;base64,${profile.profilePicture}`} /></A></td>
                                        <td><A href={`/user/${profile.userName}/main`} class="mr-2">{profile.userName}</A></td>
                                        <td>{profile.scrobbleCount} scrobbles</td>
                                    </tr>

                                // <div class="flex flex-row items-center space-x-4 h-1/12">
                                //     <A href={`/user/${profile.userName}/main`} class="w-12 h-12"><img src={`data:image/png;base64,${profile.profilePicture}`} /></A>
                                //     <A href={`/user/${profile.userName}/main`} class="mr-2">{profile.userName}</A>
                                //     <div class="mr-2">{profile.scrobbleCount}</div>
                                // </div>
                            )
                        })}
                    </table>
                </div>
                <div class="w-1/2 px-4 py-4 text-xl border-l-2 border-[#f2f3ea] flex flex-col flex-grow">
                    We have <span class="font-bold">{globalScrobbleCount()!=null && globalScrobbleCount().count}</span> scrobbles)))
                </div>
            </div>


        </div>
    )
}

export default MainPage;