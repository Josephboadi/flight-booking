"use client";
import { useState, useEffect } from "react";
// import useAuth from "../hooks/useAuth";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import flat from "@utils/flatArray";

const ProtectRoute = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRouteMatch, setIsRouteMatch] = useState(false)
  // const { auth } = useAuth();
  const {isLogingIn, isGettingMyInfo, flatMenus, myMenus, loginSuccessMessage, loginError, isAuthenticated } = useSelector((state) => state.authData);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true)
    const verifyRoute = async () => {
      console.log("route protection====================, ", myMenus, isLogingIn, isGettingMyInfo)
      try {
        if(!isLogingIn && !isGettingMyInfo){
          if(isAuthenticated){
            let flatMenu = await flat(myMenus)
            console.log(flatMenu)
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
  verifyRoute()

    return () => (isMounted = false);
  }, [isAuthenticated, isLogingIn, isGettingMyInfo,]);



  return (
    <>{ isLoading || isLogingIn || isGettingMyInfo || !isRouteMatch ? <Loader/>: <>{children}</>}</>
    // <> <Loader/></>
  );
};

export default ProtectRoute;