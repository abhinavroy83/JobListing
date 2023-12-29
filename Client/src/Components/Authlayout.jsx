import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const [loader, setloader] = useState(true);

  useEffect(() => {
    
    if (authentication && authStatus !== authentication) {
      navigate("/login");

      //false && ture!=true
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setloader(false);
  }, [authentication, authStatus, navigate]);
  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
