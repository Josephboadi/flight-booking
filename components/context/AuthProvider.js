"use client";
import { createContext, useState} from "react"

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})
    const [persist, setPersist] = useState(true)
    const [userInfo, setUserInfo] = useState()
    const [errMsg, setErrMsg] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingUser, setIsLoadingUser] = useState(true)
    const [loginLoading, setLoginLoading] = useState(false)
    
    return (
        <AuthContext.Provider value={{auth, setAuth, userInfo, isLoading, setIsLoading, loginLoading, setLoginLoading, isLoadingUser, setUserInfo, setErrMsg, errMsg, persist, setPersist}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;