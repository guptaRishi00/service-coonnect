import "./App.css";
import { Routes, Route } from "react-router-dom";

import UserRegister from "./pages/user/UserRegister";
import UserLogin from "./pages/user/UserLogin";
import WorkerRegister from "./pages/worker/WorkerRegister";
import WorkerLogin from "./pages/worker/WorkerLogin";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/worker-register" element={<WorkerRegister />} />
        <Route path="/worker-login" element={<WorkerLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
