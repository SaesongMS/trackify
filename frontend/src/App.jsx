import logo from "./logo.svg";
import styles from "./App.module.css";
import UserSettings from "./pages/user/user-settings";
import UserPageMain from "./pages/user/userpagemain";
import UserPageFollowers from "./pages/user/userPageFollowers";
import UserPageFollowing from "./pages/user/userPageFollowing";
import UserPageFavourites from "./pages/user/userPageFavourites";
import Navbar from "./components/navbar";
import Login from "./pages/user/login";

import { Router, Route, Routes } from "@solidjs/router";

function App() {
  return (
    <div class="flex w-screen h-screen bg-slate-400">
      <Navbar />
      <Routes>
        <Route path="/" element={<div></div>} />
        <Route path="/search/:query" element={<div></div>} />
        <Route path="/charts" element={<div></div>} />
        <Route path="/user/settings" element={<UserSettings />} />
        <Route path="/user/:username/main" element={<UserPageMain />} />
        <Route path="/user/:username/library" element={<UserPage />} />
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
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
