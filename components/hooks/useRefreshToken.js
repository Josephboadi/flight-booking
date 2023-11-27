"use client";
import { refreshRequest } from '@components/redux/slice/auth';
import { useDispatch } from "react-redux";

const useRefreshToken = () => {
    const dispatch = useDispatch();

    const refresh = async () => {
        await dispatch(refreshRequest({}))
    }
    return refresh
}

export default useRefreshToken;