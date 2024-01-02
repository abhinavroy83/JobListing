import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Container } from "../Components";
import { useSelector } from "react-redux";
function Job() {
  const { _id } = useParams();
  const [job, setJob] = useState(null);

  const authStatus = useSelector((state) => state.auth.status);

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
    <div className=" bg-pink-50 h-full">
      <Container>
        {job ? (
          <div className=" bg-white shadow-lg p-14 mt-4">
            <div>
              <div className="flex items-center ">
                <p className="text-gray-600 text-center font-dm-sans text-base font-medium leading-[144.023%] mr-2">
                  1w ago .
                </p>
                <p className="text-gray-600  capitalize text-center font-dm-sans text-base font-medium leading-[144.023%] mr-2">
                  {job.Jobtype}
                </p>
                <img src={job.Logo} alt="x" className="w-12 h-12 mr-2 ml-1" />
                <p className="text-gray-600  capitalize text-center font-dm-sans text-base font-medium leading-[144.023%] ml-2">
                  {job.CompanyName}
                </p>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className=" capitalize text-black font-dm-sans text-4xl font-bold leading-[144.023%]">
                    {job.Jobposition}
                  </p>
                  <p className="text-red-500 capitalize font-dm-sans text-lg font-medium leading-[144.023%]">
                    {job.Location}
                  </p>
                </div>

                <div>
                  {authStatus ? (
                    <div className=" border-2 rounded-md w-36 h-9 mr-1 border-red-500">
                      <p>
                        <Link to={`/job/edit/${job._id}`}>
                          <p className=" text-red-500 text-center text-base p-1 font-dm-sans font-medium  leading-[144.023%] capitalize">
                            Edit job
                          </p>
                        </Link>
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex pt-4 pb-4">
                <div className=" pr-3">
                  <p className="text-gray-600 font-dm-sans text-base font-normal leading-[164.5%]">
                    Stipend
                  </p>
                  <p className="text-gray-600 font-dm-sans text-base font-medium leading-[144.023%]">
                    Rs {job.Montly_Salary}/month
                  </p>
                </div>
                <div className="pl-3">
                  <p className="text-gray-600 font-dm-sans text-base font-normal leading-[164.5%]">
                    Duration
                  </p>
                  <p className="text-gray-600 font-dm-sans text-base font-medium leading-[144.023%]">
                    6 Months
                  </p>
                </div>
              </div>
              <div className="pt-6 pb-2">
                <p className="text-black font-dm-sans text-xl font-bold leading-[169.523%]">
                  About Company
                </p>
                <p className=" text-justify text-gray-600 font-dm-sans text-xl font-normal leading-[164.5%] pt-3">
                  {job.AboutCompany}
                </p>
              </div>
              <div className="pt-6 pb2">
                <p className="text-black font-dm-sans text-xl font-bold leading-[169.523%]">
                  About the job/internship
                </p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: job.JobDescription.replace(/\n/g, "<br>"),
                  }}
                  className=" text-justify  text-gray-600 font-dm-sans text-xl font-normal leading-[164.5%] pt-3"
                />
              </div>
              <div className="pt-6 pb2">
                <p className="text-black font-dm-sans text-xl font-bold leading-[169.523%]">
                  Skill(s) required
                </p>
                <div className="flex mt-3">
                  {job.Skillrequired.map((item) => (
                    <div className=" rounded-3xl bg-pink-100 text-center capitalize w-32 h-9 mr-2">
                      <p
                        key={item}
                        className="text-gray-600  text-center font-dm-sans text-xl font-normal leading-[169.523%]"
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-6 pb2">
                <p className="text-black font-dm-sans text-xl font-bold leading-[169.523%]">
                  Additional Information
                </p>
                <p className=" text-justify text-gray-600 font-dm-sans text-xl font-normal leading-[164.5%] pt-3">
                  {job.Information}
                </p>
              </div>
              {/* {<h1>{job.CompanyName}</h1>} */}
              {/* <p>{job.JobDescription}</p> */}

              {/* <Link to={`/job/edit/${job._id}`}>
                <p>edit 2</p>
              </Link> */}
            </div>
          </div>
        ) : (
          <div>
            <h1>loading...</h1>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Job;
