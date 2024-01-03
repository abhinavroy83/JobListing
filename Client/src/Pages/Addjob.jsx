import React from "react";
import { Container, JobForm } from "../Components";
import jef from "../assets/aef.png";

function Addjob() {
  return (
    <div className="flex justify-between h-full">
      <div className="flex justify-center h-screen p-4 w-8/12 bg-pink-50">
        <JobForm />
      </div>
      <img src={jef} alt="not" className=" w-4/12 h-screen bg-contain " />
    </div>
  );
}

export default Addjob;
