import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../features/auth/UserAuthSlice";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user } = useSelector((state) => state.userAuth);

  console.log(user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/home");
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
