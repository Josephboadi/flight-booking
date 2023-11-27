"use client";
import  { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useSelector } from "react-redux";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const {loginSuccessMessage} = useSelector((state) => state.authData);


  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      async(config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${loginSuccessMessage?.accessToken}`;
          
        } 
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [loginSuccessMessage, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
