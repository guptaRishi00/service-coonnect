import "./App.css";
import { Routes, Route } from "react-router-dom";

import UserRegister from "./pages/user/UserRegister";
import UserLogin from "./pages/user/UserLogin";
import WorkerRegister from "./pages/worker/WorkerRegister";
import WorkerLogin from "./pages/worker/WorkerLogin";
import Home from "./pages/Home";
import UserProfile from "./pages/user/UserProfile";
import BookNow from "./pages/BookNow";
import Navbar from "./components/Navbar";
import PostWork from "./pages/user/PostWork";
import YourWorks from "./pages/user/YourWorks";
import SearchWork from "./pages/worker/SearchWork";
import Profile from "./pages/Profile";
import Notification from "./pages/user/Notification";
import Chat from "./pages/Chat";
import Admin from "./pages/Admin";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/user-yourwork" element={<YourWorks />} />
        <Route path="/user-notification" element={<Notification />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/worker-register" element={<WorkerRegister />} />
        <Route path="/worker-login" element={<WorkerLogin />} />
        <Route path="/worker-searchwork" element={<SearchWork />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/book-now" element={<BookNow />} />
        <Route path="/post-work" element={<PostWork />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
