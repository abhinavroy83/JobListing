import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div>Home</div>
      <Link to="/addjob">Add Job</Link>
    </>
  );
}

export default Home;
