import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "./Pages/Signup.jsx";
import Login from "./Pages/Login.jsx";
import Home from "./Pages/Home.jsx";
import { Authlayout } from "./Components/index.js";
import { Provider } from "react-redux";
import store from "./Store/store.js";
import Job from "./Pages/Job.jsx";
import Addjob from "./Pages/Addjob.jsx";
import Editjob from "./Pages/Editjob.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <Authlayout authentication={false}>
            <Login />
          </Authlayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <Authlayout authentication={false}>
            <Signup />
          </Authlayout>
        ),
      },
      {
        path: "/addjob",
        element: (
          <Authlayout authentication>
            <Addjob />
          </Authlayout>
        ),
      },
      {
        path: "/job/edit/:_id",
        element: (
          <Authlayout authentication>
            <Editjob />
          </Authlayout>
        ),
      },
      {
        path: "/job/:_id",
        element: <Job />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={route} />
    </Provider>
  </React.StrictMode>
);
