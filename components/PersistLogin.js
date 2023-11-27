"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { refreshRequest } from "./redux/slice/auth";
import useLogout from "./hooks/useLogout";

const PersistLogin = ({children}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const logout = useLogout();
  const {
    isLogingIn,
    loginSuccessMessage,
    isAuthenticated,
    isRefreshAuthenticated,
  } = useSelector((state) => state.authData);

  useEffect(() => {
    let isMounted = true;
    console.log("VerifyRefreshToken Start Called=============================, ", isLogingIn, isAuthenticated,  )
    if (!isAuthenticated) {
      setLoading(true);
      const verifyRefreshToken = async () => {
        console.log("VerifyRefreshToken=============================, ", isLogingIn, isRefreshAuthenticated,  )
        try {
          await dispatch(refreshRequest());
          if (!isLogingIn && !isRefreshAuthenticated) {
            logout();
            // router.replace(`/signin`)
          }
        } catch (error) {
          console.log(error);
          logout();
        } finally {
          isMounted && setLoading(false);
        }
      };

      !loginSuccessMessage?.accessToken
        ? verifyRefreshToken()
        : setLoading(false);
    }
    return;
  }, [isRefreshAuthenticated]);

 

  return (
    <>{ loading ? <Loader/>: <>{children}</>}</>
  );
};

export default PersistLogin;
