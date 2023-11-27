"use client";
import { axiosPrivateUpload } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
// import useAuth from "./useAuth";

const useAxiosPrivateUpload = () => {
  const refresh = useRefreshToken();
  // const { auth } = useAuth();
  const {loginSuccessMessage} = useSelector((state) => state.authData);


  useEffect(() => {
    const requestIntercept = axiosPrivateUpload.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${loginSuccessMessage?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivateUpload.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivateUpload(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivateUpload.interceptors.request.eject(requestIntercept);
      axiosPrivateUpload.interceptors.response.eject(responseIntercept);
    };
  }, [loginSuccessMessage, refresh]);

  return axiosPrivateUpload;
};

export default useAxiosPrivateUpload;
