import React from "react";
import { Link } from "react-router-dom";
import group from "../assets/group_logo.png";
import flag from "../assets/inda_flag.png";
import cureny from "../assets/curncy.png";
import { useSelector } from "react-redux";

function JobCard({ ...post }) {
  const skills = post.Skillrequired;
  const authStatus = useSelector((state) => state.auth.status);
  // data.Skillrequired = inputSkills.split(",").map((skill) => skill.trim());

  return (
    <div>
      {post ? (
        <div
          className=" w-full bg-white h-28 m-3 p-3 flex justify-between"
          style={{ boxShadow: "0px 0px 22px 4px rgba(255, 32, 32, 0.25)" }}
        >
          <div className="flex w-5/12">
            <div className=" flex w-14 h-14 p-2">
              <img src={post.Logo} alt="x" />
            </div>
            <div className=" ">
              <div className="text-black font-roboto text-lg font-medium leading-tight capitalize  p-1">
                <p>{post.Jobposition}</p>
              </div>
              <div className="flex justify-between p-1">
                <div className="flex mr-3 justify-center items-center">
                  <img src={group} alt="" className=" w-4 h-4 mr-1" />
                  <p class="text-gray-500 font-roboto text-base font-medium leading-[89.188%]">
                    11-50
                  </p>
                </div>
                <div className=" flex mr-3 justify-center items-center">
                  <img
                    src={cureny}
                    alt=""
                    className=" w-3 h-4 mr-1 items-center"
                  />
                  <p class="text-gray-500 font-roboto text-base font-medium leading-[89.188%]">
                    {post.Montly_Salary}
                  </p>
                </div>
                <div className="flex capitalize mr-3 justify-center items-center">
                  <img src={flag} alt="" className="w-7 h-7 mr-2" />
                  <p class="text-gray-500 font-roboto text-base font-medium leading-[89.188%]">
                    {post.Location}
                  </p>
                </div>
              </div>
              <div className="flex p-1 text-red-500 font-roboto text-sm font-medium leading-tight capitalize">
                <p className=" pr-1">{post.Remote_office}</p>
                <p className=" pl-1">{post.Jobtype}</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex">
              {skills.map((item) => (
                <div className="rounded-sm bg-pink-100 m-1 w-24 h-8 text-center capitalize p-1">
                  <p key={item}>{item}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-end m-1 pt-2">
              <div>
                {authStatus ? (
                  <div className=" border-2 rounded-md w-36 h-9 mr-1 border-red-500">
                    <p>
                      <Link to={`/job/edit/${post._id}`}>
                        <p className=" text-red-500 text-center text-base p-1 font-dm-sans font-medium  leading-[144.023%] capitalize">
                          Edit job
                        </p>
                      </Link>
                    </p>
                  </div>
                ) : null}
              </div>
              <div className=" rounded-md w-36 h-9 bg-red-500 ml-1 ">
                <Link to={`/job/${post._id}`}>
                  <p className=" text-white text-center text-base p-2 font-dm-sans font-medium  leading-[144.023%] capitalize">
                    View details
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p className=" text-center h-full">loading...</p>
        </div>
      )}
    </div>
  );
}

export default JobCard;
