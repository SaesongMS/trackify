import ProfileNavButton from "./provilenav-button";
function ProfileNav(props) {
  const { username } = props;
  return (
    <div class="flex h-[20%] w-[100%] bg-slate-600 text-slate-200 border-t-2 border-slate-400">
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
