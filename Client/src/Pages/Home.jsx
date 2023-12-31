import axios from "axios";
import React, { useEffect, useState } from "react";
import JobCard from "../Components/JobCard";

function Home() {
  const [job, setjob] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/job/alljob")
      .then((res) => {
        if (res) {
          // console.log(res.data);
          setjob(res.data.data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {job ? (
        <div>
          {job.map((item) => (
            <div key={item._id}>
              <JobCard {...item} />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>loading....</p>
        </div>
      )}
    </>
  );
}

export default Home;
