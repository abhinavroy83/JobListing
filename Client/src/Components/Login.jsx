import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login as authlogin } from "../Store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "./index";

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [dtx, setdtx] = useState(null);
  const onsubmit = async (data) => {
    console.log(data);
    try {
      const res = await axios.post(
        "http://joblisting-cg6e.onrender.com/users/login",
        data
      );

      const result = res.data;
      // console.log(data)
      // setdtx(result);
      // const token = res.data.jwttoken;
      // const user=res.data.username;
      if (result.status === "success") {
        localStorage.setItem("userdetails", JSON.stringify(result));
        dispatch(authlogin({ token: result.jwttoken, user: result.username }));
        Navigate("/");
      } else {
        alert("User not found. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      console.error("Response data:", error.response?.data);
      console.error("Response status:", error.response?.status);
      console.error("Response headers:", error.response?.headers);

      alert("An error occurred during login. Please try again later.");
    }
    reset();
  };
  return (
    <div className="flex  bg-white shadow-lg h-3/5 w-6/12 p-9 flex-col ">
      <p className="text-black font-dm-sans text-5xl font-bold leading-[144.023%]">
        Already have an account?
      </p>
      <p className="text-gray-600 font-dm-sans text-base font-medium leading-[144.023%] mb-2">
        Your personal job finder is here
      </p>
      <form
        onSubmit={handleSubmit(onsubmit)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Input
          type="text"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            validate: {
              matchPatern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            },
          })}
        />
        {errors.email && (
          <p className=" text-red-700">{errors.email.message}</p>
        )}
        <Input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "password is required",
            validate: {
              matchPatern: (value) =>
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(
                  value
                ) ||
                "Password at least contain 8 character and at least 1 uppercase,lowercase and NUmber",
            },
          })}
        />
        {errors.password && (
          <p className=" text-red-700">{errors.password.message}</p>
        )}
        <button
          type="submit"
          className="border-2 mt-7 mb-4 rounded-md w-4/12 h-13 mr-1 border-red-500 bg-red-500 p-2 text-white text-center font-dm-sans text-2xl font-bold leading-[144.023%]"
        >
          Sign In
        </button>
      </form>
      <div className="flex">
        <p className="text-gray-600  font-dm-sans text-base font-medium leading-[144.023%]">
          Don’t have an account?
        </p>
        <Link to={"/signup"}>
          <p className=" text-black  mx-1 font-sans text-base font-medium underline">
            Sign Up
          </p>
        </Link>
      </div>
    </div>
    // <div>
    //   {result ? (
    //   ) : (
    //     <div>
    //       <p>signin.......</p>
    //     </div>
    //   )}
    // </div>
  );
}

export default Login;
