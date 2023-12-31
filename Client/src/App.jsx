import "./App.css";
import { Header, Signup } from "./Components";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className=" w-full flex flex-wrap">
      <div className=" w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
