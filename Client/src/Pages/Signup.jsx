import React from "react";
import { Signup as SignupComponent } from "../Components";
import logides from "../assets/loginimag.png";

function Signup() {
  return (
    <div className="flex w-screen h-screen justify-between">
      <div className="flex justify-center items-center w-7/12 bg-pink-50">
        <SignupComponent />
      </div>
      <img src={logides} alt="notfound" className=" w-5/12 h-screen bg-contain" />
    </div>
  );
}

export default Signup;
