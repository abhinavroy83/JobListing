import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Input } from "./index";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authlogin } from "../Store/authSlice";

function Signup() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const [error, seterror] = useState("");
  const onSubmit = (data) => {
    try {
      // console.log(data);
      axios
        .post("http://joblisting-cg6e.onrender.com/users/register", data)
        .then((res) => {
          const result = res.data;
          // const token = res.data.jwttoken;
          // const user=res.data.username;
          if (result.status === "success") {
            localStorage.setItem("userdetails", JSON.stringify(result));
            dispatch(
              authlogin({ token: result.jwttoken, user: result.username })
            );
            Navigate("/");
          } else if (
            result.status === "failed" &&
            result.msg === "Email already exists"
          ) {
            alert("Email already exists. Please use a different email.");
          } else {
            alert("Registration failed. Please try again.");
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex  bg-white shadow-lg h-4/5 w-3/5 p-9 flex-col ">
      <p className="text-black font-dm-sans text-5xl font-bold leading-[144.023%]">
        Create an account
      </p>
      <p className="text-gray-600 font-dm-sans text-base font-medium leading-[144.023%] mb-2">
        Your personal job finder is here
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Input
          type="text"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className=" text-red-700">{errors.name.message}</p>}
        <Input
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            validate: {
              matchPattern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            },
          })}
        />
        {errors.email && (
          <p className=" text-red-700">{errors.email.message}</p>
        )}
        <Input
          placeholder="Number"
          type="number"
          {...register("number", {
            required: "Number is required",
            validate: {
              matchPattern: (value) =>
                /^\d{10}$/.test(value) || "Number Must be 10 Digit",
            },
          })}
        />
        {errors.number && (
          <p className=" text-red-700">{errors.number.message}</p>
        )}
        <Input
          type="text"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            validate: {
              matchPattern: (value) =>
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
        <div className="flex ">
          <input
            type="checkbox"
            {...register("checkbox", { required: true })}
          />
          <p className="text-gray-600 ml-2 my-2 font-dm-sans text-base font-normal tracking-[0.337px] leading-[144.023%]">
            By creating an account, I agree to our terms of use and privacy
            policy
          </p>
        </div>
        {errors.checkbox && <p className=" text-red-700">invalid</p>}

        <button
          type="submit"
          className="border-2 mt-7 mb-4 rounded-md w-4/12 h-13 mr-1 border-red-500 bg-red-500 p-2 text-white text-center font-dm-sans text-2xl font-bold leading-[144.023%]"
        >
          Create Account
        </button>
      </form>
      <div className="flex">
        <p className="text-gray-600  font-dm-sans text-base font-medium leading-[144.023%]">
          Already have an account?
        </p>
        <Link to={"/login"}>
          <p className=" text-black  mx-1 font-sans text-base font-medium underline">
            Sign In
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Signup;
