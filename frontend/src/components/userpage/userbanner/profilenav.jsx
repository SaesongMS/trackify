import ProfileNavButton from "./provilenav-button";
function ProfileNav(props) {
  const { username } = props;
  return (
    <div class="flex h-[20%] bg-[#2b2d31] text-[#f2f3ea] border-t-2 border-[#35363c]">
      <ProfileNavButton title="Main" destination={`/user/${username}/main`} />
      <ProfileNavButton title="Library" destination={`/user/${username}/library`} />
      <ProfileNavButton
        title="Following"
        destination={`/user/${username}/following`}
      />
      <ProfileNavButton
        title="Followers"
        destination={`/user/${username}/followers`}
      />
      <ProfileNavButton
        title="Favourites"
        destination={`/user/${username}/favourites`}
      />
    </div>
  );
}

export default ProfileNav;
