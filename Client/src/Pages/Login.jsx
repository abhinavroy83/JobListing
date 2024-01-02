import React from "react";
import { Login as LoginComponet } from "../Components/index";
import logides from "../assets/loginimag.png";

function Login() {
  return (
    <div className="flex w-screen h-screen">
      <LoginComponet />
      <img src={logides} alt=" notfound" />
    </div>
  );
}

export default Login;
