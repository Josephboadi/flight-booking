"use client"
import { useEffect } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import axios from "axios";
import Link from "next/link";
import { loginRequest } from '@/components/redux/slice/auth';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'

const schema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().min(6,'Password should be at least 6 characters')
  })
  .required();


const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {isLogingIn, isGettingMyInfo, myInfo, loginSuccessMessage, loginError, isAuthenticated } = useSelector((state) => state.authData);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      })

    const onSubmit= async(data) => {
        // localStorage.setItem("persist", true);
        // console.log(data)
        // await window.localStorage.setItem('username', data.username)
       
        
    
        // const data1 = {...data, dateStarted: new Date().toLocaleString()}

        // console.log("modified data=====================, ", data1);
    
      
          await dispatch(loginRequest({
            data: {...data},
          }))
        //   setLoading(true);
          // const response = await axios.post("/api/auth/login",  data1, { headers: { "Content-Type": "application/json" },withCredentials: true });
          
          // setSuccess(response?.data?.Message)
          // toast.success(response.data.Message);
          // redirect("/main");
        //   await window.sessionStorage.setItem('isAuthenticated', true)
        //   window.location.href = '/main'
          // console.log("Login success", response.data);
     
        
    
    
        return
      }

      useEffect(() => {
        if(loginError) {
          toast.error(loginError?.Message, {
              position: toast.POSITION.TOP_RIGHT
          })
      }
      if(loginSuccessMessage) {
        toast.success(loginSuccessMessage?.Message, {
            position: toast.POSITION.TOP_RIGHT
        })
        router.replace(`/`)
    }
    
      },[loginSuccessMessage, loginError])



  return (
    <>
    {!isLogingIn && loginSuccessMessage && <ToastContainer />}
    {!isLogingIn && loginError && <ToastContainer />}
    <div className="bg-white rounded-2xl p-4 md:p-6 lg:p-8">
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="mb-4 h3"> Welcome Back! </h3>
      <p className="mb-10"> Sign in to your account and join us </p>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <label
            htmlFor="enter-email"
            className="text-base sm:text-lg md:text-xl font-medium block mb-3">
            Enter Your Email
          </label>
          <input
            type="text"
            className="w-full bg-[var(--bg-1)] border focus:outline-none rounded-full py-3 px-5"
            placeholder="Enter Your Email"
            id="enter-email"
            name="enter-email"
            defaultValue="" {...register("email")}
          />
        </div>
        <div className="col-span-12">
          <label
            htmlFor="enter-password"
            className="text-base sm:text-lg md:text-xl font-medium block mb-3">
            Enter Your Password
          </label>
          <input
            type="password"
            className="w-full bg-[var(--bg-1)] border focus:outline-none rounded-full py-3 px-5 mb-3"
            placeholder="Enter Your Password"
            id="enter-password"
            name="enter-password"
            defaultValue="" {...register("password")}
          />
          <Link
            href="signup"
            className="link block text-sm text-primary :clr-primary-400 text-end">
            Forget password
          </Link>
        </div>
        <div className="col-span-12">
          <p className="mb-0">
            Don&apos;t have an account?{" "}
            <Link
              href="signup"
              className="link font-semibold text-primary">
              Signup
            </Link>
          </p>
        </div>
        <div className="col-span-12">
          <button
         
            className="link inline-flex items-center gap-2 py-3 px-6 rounded-full bg-primary text-white :bg-primary-400 hover:text-white font-semibold">
            <span className="inline-block"> Signin </span>
          </button>
        </div>
      </div>
    </form>
  </div>
    </>
    
  );
};

export default Page;