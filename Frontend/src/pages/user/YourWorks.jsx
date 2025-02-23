import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWork } from "../../features/auth/PostWorkSlice";

function YourWorks() {
  const { work } = useSelector((state) => state.userWork);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWork());
  }, [dispatch]);

  console.log("your work: ", work?.work);

  return <div>YourWorks</div>;
}

export default YourWorks;
