import logo from "./logo.svg";
import styles from "./App.module.css";
import UserSettings from "./pages/user/user-settings";
import UserPage from "./pages/user/user-page";
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
          <Route path="/user/:username" element={<UserPage />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
