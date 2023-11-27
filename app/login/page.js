"use client"
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
// import axios from "axios";
import { useForm } from "react-hook-form";
// import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
// import { authenticationRequest, loginRequest } from "../redux/slice/auth";
import {useEffect, useState } from 'react';
// import useAuth from '@components/hooks/useAuth';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
// import { loginRequest } from '@components/redux/slice/auth';
import { redirect, useRouter } from 'next/navigation';
import { loginRequest } from '@/components/redux/slice/auth';

const schema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().min(6,'Password should be at least 6 characters')
  })
  .required();

const Login = () => {
  // const { setAuth, setErrMsg, errMsg, setLoginLoading, loginLoading, isAuthenticated } =
  //   useAuth();
    // const navigate = useNavigate();

  const dispatch = useDispatch();
  const router = useRouter()
  const {isLogingIn, isGettingMyInfo, myInfo, loginSuccessMessage, loginError, isAuthenticated } = useSelector((state) => state.authData);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState()
  const [errorMsg, setErrorMsg] = useState()
//   const { error, loading } = useSelector(state => ({
//     error: state?.login?.error,
//     loading: state?.login?.loading
// }));

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit= async(data) => {
    console.log("Login Page==========================, ", data)
    // localStorage.setItem("persist", true);
    // console.log(data)
    // await window.localStorage.setItem('username', data.username)
   
   

    // const data1 = {...data, dateStarted: new Date().toLocaleString()}
    const data1 = {...data}

 
      // setLoading(true);
      await dispatch(loginRequest({data: data1}))

    return
  }

  // useEffect(() => {
  //   if( isAuthenticated) {
  //     redirect("/main")
  // }
  // return
  // },[])

  // useEffect(() => {
       
  //   if(!isLogingIn && !isGettingMyInfo && isAuthenticated) {
  //     toast.success(loginSuccessMessage?.Message, {
  //         position: toast.POSITION.TOP_RIGHT
  //     })
  //     // redirect("/main/loader");
  //     // navigate("/");
  // }
  //     if(!isLogingIn && myInfo && isAuthenticated) {
  //       redirect("/main");
  //     }
  //   },[loginSuccessMessage, myInfo])

  //   useEffect(() => {
  //     if(!isAuthenticated) {
  //       toast.error(loginError?.Message, {
  //           position: toast.POSITION.TOP_RIGHT
  //       })
  //   }
    
    
  //   },[loginError])


//   useEffect(() => {
//     if(loginError) {
//       toast.error(loginError?.Message, {
//           position: toast.POSITION.TOP_RIGHT
//       })
//   }
//   if(loginSuccessMessage) {
//     toast.success(loginSuccessMessage?.Message, {
//         position: toast.POSITION.TOP_RIGHT
//     })
//     navigate("/");
// }
//     if(!isAuthenticating && authenticationSuccessMessage) {
//         navigate("/");
//     }
//   },[authenticationSuccessMessage])


  return (
    <>
    {/* {isAuthenticated && <ToastContainer />}
    {errMsg && <ToastContainer />} */}
     {success && <ToastContainer />}
    {errorMsg && <ToastContainer />}
        <main className="flex justify-center items-center h-[100vh] w-[100vw] overflow-hidden font-kuro bg-[#f2f2f2]">
      {/* <div className="h-[80%] w-[84%] sm:w-[80%] md:[84%] lg:w-[70%] flex justify-center items-center bg-white shadow-lg rounded-lg overflow-hidden"> */}
      <div className="h-[100%] w-[100%] flex justify-center items-center bg-white shadow-lg  overflow-hidden">
        <section className="hidden md:flex flex-col items-center h-full md:w-[55%] lg:w-[65%]  overflow-hidden ">
          <Image
            src={'/assets/CalBank_Head_Office.jpeg'}
            alt="bg-img"
            width={100}
              height={100}
            className="w-[100%] h-[100%] object-cover bg-no-repeat"
          />
        </section>

        <section className="flex flex-col mt-[24vh] items-center w-[80%] sm:w-[65%] md:w-[45%] lg:w-[35%]  h-full p-[5%] overflow-hidden">
          <div className="flex flex-col justify-center items-center w-[100%]">
            <Image src={'/assets/calbank-logo.webp'} width={150}  height={100} alt="logo" className="w-[150px] object-contain" />
            <h3 className="mt-[0.8rem] font-extrabold">
              <span className=" text-[1rem] font-normal ">Login to &nbsp;</span>
              QR Code Review Potal
            </h3>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col justify-center mt-[2.5rem] transition-[0.5s] w-[100%] xl:w-[90%]"
            >
              <div>
                <div className="form_div">
                  <input
                    type="text"
                    
                    id="email"
                    className={`form_input ${errors?.email && '!border-red-500'}`}
                    placeholder=" "
                    defaultValue="" {...register("email")}
                  />
                  <label htmlFor="email" className={`form_label ${errors?.email && '!text-red-500'}`}>
                    Enter User Email
                  </label>
                  
                </div>
                {errors.email && <span className=" text-red-500 text-sm ml-2">{errors.email?.message}</span>}
                <div className={`form_div mt-[1.6em] `}>
                  <input
                    type="password"
                    id="password"
                    className={`form_input ${errors?.password  && "!border-red-500"}`}
                    placeholder=" "
                    defaultValue="" {...register("password")}
                  />
                  <label htmlFor="password" className={`form_label ${errors?.password  && "!text-red-500"}`}>
                    Enter Password
                  </label>
                  
                </div>
                {errors.password && <span className=" text-red-500 text-sm ml-2">{errors.password?.message}</span>}

                {/* <button className="form_button cursor-pointer">
                {"Sign In"}
              </button> */}

              <button disabled={isLogingIn ? true: false} className="form_button cursor-pointer">
                {isLogingIn  ? "Loading..." :"Sign In"}
              </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
    </>
  );
};

export default Login;