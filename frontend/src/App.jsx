import logo from "./logo.svg";
import styles from "./App.module.css";
import UserSettings from "./pages/user/user-settings";
import UserPageMain from "./pages/user/userpagemain";
import Navbar from "./components/navbar";

import { Router, Route, Routes } from "@solidjs/router";

function App() {
  return (
    <Router>
      <div class="flex w-screen h-screen bg-slate-400">
        <Navbar />
        <Routes>
          <Route path="/" element={<div></div>} />
          <Route path="/search/:query" element={<div></div>} />
          <Route path="/charts" element={<div></div>} />
          <Route path="/user/settings" element={<UserSettings />} />
          <Route path="/user/:username/main" element={<UserPageMain />} />
          <Route path="/user/:username/library" element={<UserPage />} />
          <Route path="/user/:username/following" element={<UserPage />} />
          <Route path="/user/:username/followers" element={<UserPage />} />
          <Route path="/user/:username/favourites" element={<UserPage />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
