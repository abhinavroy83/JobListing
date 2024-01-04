import axios from "axios";
import React, { useEffect, useState } from "react";
import JobCard from "../Components/JobCard";
// import ClipLoader from "react-spinners/ClipLoader";
import { FadeLoader } from "react-spinners";
import { Link } from "react-router-dom";

import { Container, Header } from "../Components";

function Home() {
  const [job, setjob] = useState([]);
  useEffect(() => {
    axios
      .get("https://joblisting-cg6e.onrender.com/job/alljob")
      .then((res) => {
        if (res) {
          // console.log(res.data);
          setjob(res.data.data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <Header />
      {job && job.length > 0 ? (
        <div className="w-full py-8">
          {/* <Link to="/addjob">addjob</Link> */}
          <Container>
            <div className=" flex flex-col">
              {job ? (
                <div className=" w-full ">
                  {job.map((item) => (
                    <div key={item._id} className="">
                      <JobCard {...item} />
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <p>loading....</p>
                </div>
              )}
              <p className=" text-center text-pink-600">Created and maintained by Abhinav</p>
            </div>

          </Container>

        </div>
      ) : (
        <div>
          <Container>
            <div className="flex items-center justify-center h-screen">
              <FadeLoader loading={true} color={"#ED5353"} size={150} />
            </div>
            {/* <p className=" text-center">loading....</p> */}
          </Container>
        </div>
      )}
    </div>
  );
}

export default Home;
