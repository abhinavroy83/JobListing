import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { JobForm } from "../Components";
import { Container } from "../Components";

function Editjob() {
  const { _id } = useParams();
  const [post, setjob] = useState(null);
  useEffect(() => {
    if (_id) {
      axios
        .get(`http://localhost:5000/job/${_id}`)
        .then((res) => {
          setjob(res.data.job);
          //   console.log(res.data.job);
        })

        .catch((error) => console.error(error));
    }
  }, [_id]);
  return (
    <div>
      <Container>
        <JobForm post={post} />
      </Container>
    </div>
  );
}

export default Editjob;
