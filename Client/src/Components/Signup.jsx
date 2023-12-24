import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function Signup() {
  const { register, handleSubmit } = useForm();
  // const [error, seterror] = useState("");
  const onSubmit = (data) => {
    try {
      // console.log(data);
      axios
        .post("http://localhost:5000/users/register", data)
        .then((res) => console.log(res.data))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Create an account</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", width: "50vh" }}
      >
        <input
          type="text"
          placeholder="Name"
          {...register("name", { required: true })}
        />
        <input
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
          placeholder="Number"
          type="number"
          {...register("number", {
            required: true,
            // validate: {
            //   matchPatern: (value) =>
            //     /09(0[1-2]|1[\d]|3[\d]|2[0-1])[\d]{3}[\d]{4}/g.test(value) ||
            //     "Number Must be 10 Digit",
            // },
          })}
        />
        <input
          type="text"
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
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default Signup;
