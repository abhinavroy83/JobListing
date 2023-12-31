import React, { useEffect } from "react";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
// import { login as authlogin } from "../../Store/authSlice";
import Logoutbtn from "./Logoutbtn";
import { Link } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="header_main">
      <div className="header_name">
        <Link to="/">
          <p>JobFinder</p>
        </Link>
      </div>
      <div>
        {!authStatus ? (
          <div className=" flex justify-evenly cursor-default">
            <Link to="/login">
              <p className="rounded-md border-2 border-white bg-red-500 pr-4 pl-4 pt-1 pb-1 text-white text-center font-DM_Sans font-medium text-xl">
                Login
              </p>
              {/* <p>login</p> */}
            </Link>
            <Link to="/signup">
              <p className="rounded-md border-2 bg-white text-red-500 pr-3 pl-3 pt-1 pb-1 ml-4 text-center font-DM_Sans font-medium text-xl">
                Register
              </p>
            </Link>
          </div>
        ) : (
          <div className="flex text-white text-center font-DM_Sans font-medium text-xl cursor-default">
            <p className=" mx-2">
              Hello! <span className=" ml-1 capitalize">{user}</span>
            </p>
            <Link to="/addjob" className="mx-2">
              <p>Addjob</p>
            </Link>
            <Logoutbtn className=" mx-2" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
