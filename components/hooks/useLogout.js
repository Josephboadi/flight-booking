"use client";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { resetAuth } from "../redux/slice/auth";

const useLogout = () => {
  const dispatch = useDispatch();
  const { replace } = useRouter();

  const logout = async () => {
    try {
      //  await axios.post("/api/auth/logout", JSON.stringify({ dateStarted: new Date().toLocaleString() }),
      //  {
      //    withCredentials: true,
      //  });

      dispatch(resetAuth());
      console.log("Reflesh Logout called===========================")
      replace('/signin')

    } catch (error) {
      console.error(error);
    }
  };

  return logout;
};

export default useLogout;
