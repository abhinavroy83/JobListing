import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../Store/authSlice";

function Logoutbtn() {
  const dispatch = useDispatch();
  const handlelogut = () => {
    dispatch(logout());
    localStorage.removeItem("userdetails");
  };

  return (
    <div
      className=" text-white text-center font-DM_Sans font-medium text-xl mr-7 cursor-pointer"
      onClick={handlelogut}
    >
      Logout
    </div>
  );
}

export default Logoutbtn;
