"use client";
import { Provider } from "react-redux";
import store from "./store";

const Providers = ({children}) => {
    // console.log("Provider called=============")
    // window.addEventListener("beforeunload", function(e) {
    //     window.sessionStorage.setItem("isAuthenticated",false);
    //   });
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default Providers;