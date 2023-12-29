import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../Store/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const onsubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/users/login", data);

      const token = res.data.jwttoken;
      dispatch({ type: login, payload: token });
      Navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
    }
    reset();
  };
  return (
    <div>
      <h1>Already have an account?</h1>
      <p>Your personal job finder is here</p>
      <form
        onSubmit={handleSubmit(onsubmit)}
        style={{ display: "flex", flexDirection: "column", width: "50vh" }}
      >
        <input
          type="text"
          placeholder="Email"
          {...register("email", {
            required: true,
            validate: {
              matchPatern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            },
          })}
        />
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: true,
            validate: {
              matchPatern: (value) =>
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(
                  value
                ) ||
                "Password at least contain 8 character and at least 1 uppercase,lowercase and NUmber",
            },
          })}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Login;
