import axios from "axios";
import React, { useEffect, useState } from "react";
import JobCard from "../Components/JobCard";
import { Link } from "react-router-dom";

import { Container, Header } from "../Components";

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
    <div>
      <Header />
      {job && job.length > 0 ? (
        <div className="w-full py-8">
          {/* <Link to="/addjob">addjob</Link> */}
          <Container>
            <div className=" flex flex-row">
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
            </div>
          </Container>
        </div>
      ) : (
        <div>
          <Container>
            <p className=" text-center">loading...</p>
          </Container>
        </div>
      )}
    </div>
  );
}

export default Home;
