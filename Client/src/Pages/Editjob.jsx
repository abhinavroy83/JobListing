import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { JobForm } from "../Components";
import { Container } from "../Components";
import jef from "../assets/aef.png";

function Editjob() {
  const { _id } = useParams();
  const [post, setjob] = useState(null);
  useEffect(() => {
    if (_id) {
      axios
        .get(`https://joblisting-cg6e.onrender.com/job/${_id}`)
        .then((res) => {
          setjob(res.data.job);
          //   console.log(res.data.job);
        })

        .catch((error) => console.error(error));
    }
  }, [_id]);
  return (
    <div>
      <div className="flex justify-between h-full">
        <div className="flex justify-center h-screen p-4 w-8/12 bg-pink-50">
          <JobForm post={post} />
        </div>
        <img src={jef} alt="not" className=" w-4/12 h-screen bg-contain " />
      </div>
    </div>
  );
}

export default Editjob;
