import React from "react";
import { Link } from "react-router-dom";

function JobCard({ ...post }) {
  return (
    <Link to={`/job/${post._id}`}>
      <div>
        <p>{post.CompanyName}</p>
        <p>{post.Jobposition}</p>
      </div>
    </Link>
  );
}

export default JobCard;
