import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Addjob() {
  const token = useSelector((state) => state.auth.token);
  const [job, setJobs] = useState([]);

  useEffect(() => {
    const fetchjob = async () => {
      try {
        const res = axios.get("http://localhost:5000/home", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const jobdata = await res.json();
          setJobs(jobdata);
        } else {
          console.error("Errror during fetching data");
        }
      } catch (error) {
        console.error("Error during job fetch:", error);
      }
    };
    fetchjob();
  }, [token]);
  return <div>
    welocme to the job page
    {/* {job ? <>{job.msg}</> : <p>Loading...</p>} */}
    </div>;
}

export default Addjob;
