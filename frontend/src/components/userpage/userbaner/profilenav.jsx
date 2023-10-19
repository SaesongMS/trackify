import ProfileNavButton from "./provilenav-button";
function ProfileNav()
{
    return (
        <div class="flex h-[20%] w-[100%] bg-slate-600">
            <ProfileNavButton title="Main" destination="/" />
            <ProfileNavButton title="Library" destination="/" />
            <ProfileNavButton title="Following" destination="/" />
            <ProfileNavButton title="Followers" destination="/" />
            <ProfileNavButton title="Favourites" destination="/" />
        </div>
    )
}

export default ProfileNav;