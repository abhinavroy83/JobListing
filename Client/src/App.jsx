import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { Header, Signup } from "./Components";
import { Outlet } from "react-router-dom";
import { login as authlogin } from "./Store/authSlice";

function App() {
  const dispatch = useDispatch();

  // console.log(user);
  useEffect(() => {
    // Check local storage for user details on page load
    const storedUser = JSON.parse(localStorage.getItem("userdetails"));

    if (storedUser) {
      // Automatically log in the user if details are found
      //   console.log("Redux State:", useSelector((state) => state.auth));
      dispatch(
        authlogin({ token: storedUser.jwttoken, user: storedUser.username })
      );
    }
  }, [dispatch]);
  return (
    <div className=" min-h-screen flex flex-wrap content-between">
      <div className=" w-full block">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
