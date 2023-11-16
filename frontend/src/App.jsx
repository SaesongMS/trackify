import UserSettings from "./pages/user/user-settings";
import UserPageMain from "./pages/user/userpagemain";
import UserPageFollowers from "./pages/user/userPageFollowers";
import UserPageFollowing from "./pages/user/userPageFollowing";
import UserPageFavourites from "./pages/user/userPageFavourites";
import Navbar from "./components/navbar";
import Search from "./pages/search/search";
import Login from "./pages/user/auth/login";
import Register from "./pages/user/auth/register";
import { Router, Route, Routes } from "@solidjs/router";
import ScrobbleLibrary from "./pages/user/library/scrobbleLibrary";
import SubjectLibrary from "./pages/user/library/subjectLibrary";
import SubjectPage from "./pages/subject/subject";

function App() {
  return (
    <div class="flex w-screen h-screen bg-slate-400">
      <Navbar />
      <Routes>
        <Route path="/" element={<div></div>} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/charts" element={<div></div>} />
        <Route path="/user/settings" element={<UserSettings />} />
        <Route path="/user/:username/main" element={<UserPageMain />} />
        <Route path="/user/:username/library" element={<ScrobbleLibrary />} />
        <Route
          path="/user/:username/library/:subject"
          element={<SubjectLibrary />}
        />
        <Route
          path="/user/:username/following"
          element={<UserPageFollowing />}
        />
        <Route
          path="/user/:username/followers"
          element={<UserPageFollowers />}
        />
        <Route
          path="/user/:username/favourites"
          element={<UserPageFavourites />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:subject/:name" element={<SubjectPage />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
