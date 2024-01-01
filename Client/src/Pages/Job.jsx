import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Job() {
  const { _id } = useParams();
  const [job, setJob] = useState(null);

  // console.log("param", _id);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/job/${_id}`)
      .then((res) => {
        if (res.data && res.data.job) {
          setJob(res.data.job);
          // console.log(res.data.job);
        }
      })
      .catch((error) => {
        console.error("Error in Axios request:", error);
      });
  }, [_id]);

  return (
    <div>
      <p>hello</p>
      {job ? (
        <div>
          {<h1>{job.CompanyName}</h1>}

          <Link to={`/job/edit/${job._id}`}>
            <p>edit 2</p>
          </Link>
        </div>
      ) : (
        <div>
          <h1>loading...</h1>
        </div>
      )}
    </div>
  );
}

export default Job;
