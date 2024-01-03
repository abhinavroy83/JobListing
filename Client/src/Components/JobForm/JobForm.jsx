import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../index";

function JobForm({ post }) {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const { _id } = useParams();
  // const [job, setJobs] = useState([]);
  const Jobtype = ["fulltime", "internship"];
  const remote_office = ["Remote", "Office"];
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  // console.log("editpsot", post);

  const inputSkills = watch("Skillrequired", "");
  const Onsubmit = async (data) => {
    if (post) {
      // data.Skillrequired = (data.Skillrequired || "").split(",").map((skill) => skill.trim());
      try {
        const editres = await axios.put(
          `http://localhost:5000/job/editjob/${post._id}`,
          data
        );
        // console.log("edit re", editres);
        if (editres) {
          // alert("job update successfully");
          navigate(`/job/${post._id}`);
        }
      } catch (error) {
        console.error("error during edting", error);
      }
    } else {
      data.Skillrequired = inputSkills.split(",").map((skill) => skill.trim());
      try {
        const response = await axios.post(
          "http://localhost:5000/addjob",
          data,
          {
            headers: {
              jwttoken: `${token}`,
            },
          }
        );
        if (response) {
          // console.log(res)
          navigate("/");
          // console.log(response.data);
        }
      } catch (error) {
        console.error("Error during job fetch:", error);
      }
    }
    reset();
  };
  useEffect(() => {
    // Set default values when post changes
    setValue("CompanyName", post?.CompanyName || "");
    setValue("Logo", post?.Logo || "");
    setValue("Jobposition", post?.Jobposition || "");
    setValue("Montly_Salary", post?.Montly_Salary || "");
    setValue("Jobtype", post?.Jobtype || "");
    setValue("Remote_office", post?.Remote_office || "");
    setValue("Location", post?.Location || "");
    setValue("JobDescription", post?.JobDescription || "");
    setValue("AboutCompany", post?.AboutCompany || "");
    // console.log(typeof post?.Skillrequired);

    setValue("Skillrequired", post?.Skillrequired || "");
    setValue("Information", post?.Information || "");

    // console.log("Updated defaultValues", watch());
  }, [post, setValue]);

  return (
    <div className="flex w-5/6 flex-col ">
      <p className="text-black font-dm-sans text-4xl font-bold leading-[144.023%]">
        Add job description
      </p>
      <form onSubmit={handleSubmit(Onsubmit)}>
        <div className="flex items-center justify-between">
          <p className="text-black font-sans text-2xl text-center font-normal">
            Company Name
          </p>
          <input
            className=" px-4 py-1 my-2 w-8/12 rounded-md border-2 border-gray-300 bg-white  text-black outline-none focus:bg-gray-50 duration-200 "
            type="text"
            placeholder="Enter your company name here"
            {...register("CompanyName", { required: true })}
            // value={post.CompanyName}
          />
        </div>
        {errors.CompanyName && (
          <p style={{ color: "red" }} className=" text-xs">
            CompanyName is required
          </p>
        )}
        <div className="flex items-center justify-between">
          <p className="text-black font-sans text-2xl mr-4 text-center font-normal">
            Add logo url
          </p>

          <input
            className=" px-4 py-1 my-2 w-8/12 rounded-md border-2 border-gray-300 bg-white  text-black outline-none focus:bg-gray-50 duration-200 "
            type="text"
            placeholder="Enter the link"
            {...register("Logo", { required: true })}
          />
        </div>
        {errors.Logo && <p style={{ color: "red" }}>Logo is required</p>}
        <div className="flex items-center justify-between">
          <p className="text-black font-sans text-2xl mr-4 text-center font-normal">
            Job Postion
          </p>

          <input
            className=" px-4 py-1 my-2 w-8/12 rounded-md border-2 border-gray-300 bg-white  text-black outline-none focus:bg-gray-50 duration-200 "
            type="text"
            {...register("Jobposition", { required: true })}
          />
        </div>
        {errors.Jobposition && (
          <p style={{ color: "red" }}>Jobposition is required</p>
        )}
        <div className="flex items-center justify-between">
          <p className="text-black font-sans text-2xl mr-4 text-center font-normal">
            Montly Salary
          </p>
          <input
            className=" px-4 py-1 my-2 w-8/12 rounded-md border-2 border-gray-300 bg-white  text-black outline-none focus:bg-gray-50 duration-200 "
            type="Number"
            {...register("Montly_Salary", { required: true })}
          />
        </div>
        {errors.Montly_Salary && (
          <p style={{ color: "red" }}>Montly_Salary is required</p>
        )}
        <div className="flex items-center justify-between">
          <p className="text-black font-sans text-2xl mr-4 text-center font-normal">
            Job type
          </p>
          <select
            {...register("Jobtype", { required: true })}
            className=" px-4 py-1 my-2 w-4/12 rounded-md border-2 border-gray-300 bg-white  text-black outline-none focus:bg-gray-50 duration-200"
          >
            <option value="">Select</option>
            {Jobtype.map((type, index) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        {errors.Jobtype && <p style={{ color: "red" }}>Skill is required</p>}
        <div className="flex items-center justify-between">
          <p className="text-black font-sans text-2xl mr-4 text-center font-normal">
            Remote/office
          </p>
          <select
            className=" px-4 py-1 my-2 w-4/12 rounded-md border-2 border-gray-300 bg-white  text-black outline-none focus:bg-gray-50 duration-200"
            {...register("Remote_office", { required: true })}
          >
            <option value="">Select</option>
            {remote_office.map((item, index) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        {errors.Remote_office && (
          <p style={{ color: "red" }}>select an option </p>
        )}
        <div className="flex items-center justify-between">
          <p className="text-black font-sans text-2xl mr-4 text-center font-normal">
            Location
          </p>
          <input
            type="text"
            {...register("Location", { required: true })}
            className=" px-4 py-1 my-2 w-8/12 rounded-md border-2 border-gray-300 bg-white  text-black outline-none focus:bg-gray-50 duration-200"
          />
        </div>
        {errors.Location && (
          <p style={{ color: "red" }}>Location can't be empty</p>
        )}
        <div className="flex items-center justify-between">
          <p className="text-black font-sans text-2xl mr-4 text-center font-normal">
            JobDescription
          </p>
          <textarea
            rows="3"
            className=" px-2 py-1 my-2 w-8/12 rounded-md border-2 border-gray-300 bg-white  text-black outline-none focus:bg-gray-50 duration-200"
            {...register("JobDescription", { required: true })}
          />
        </div>
        {errors.JobDescription && (
          <p style={{ color: "red" }}>JobDescription can't be empty</p>
        )}
        <div className="flex items-center justify-between">
          <p className="text-black font-sans text-2xl mr-4 text-center font-normal">
            AboutCompany
          </p>
          <textarea
            rows="3"
            // cols="30"
            className=" px-4 py-1 my-2 w-8/12 rounded-md border-2 border-gray-300 bg-white  text-black outline-none focus:bg-gray-50 duration-200"
            type="text"
            {...register("AboutCompany", { required: true })}
          />
        </div>
        {errors.AboutCompany && (
          <p style={{ color: "red" }}>AboutCompany can't be empty</p>
        )}

        <div className="flex items-center justify-between">
          <p className="text-black font-sans text-2xl mr-4 text-center font-normal">
            Skills
          </p>
          <input
            type="text"
            className=" px-4 py-1 my-2 w-8/12 rounded-md border-2 border-gray-300 bg-white  text-black outline-none focus:bg-gray-50 duration-200"
            {...register("Skillrequired", { required: true })}
          />
        </div>
        {errors.Skillrequired && (
          <p style={{ color: "red" }}>Skill is required</p>
        )}
        <div className="flex items-center justify-between">
          <p className="text-black font-sans text-2xl mr-4 text-center font-normal">
            Information
          </p>
          <textarea
            rows="2"
            type="text"
            className=" px-4 py-1 my-1 w-8/12 rounded-md border-2 border-gray-300 bg-white  text-black outline-none focus:bg-gray-50 duration-200"
            {...register("Information", { required: true })}
          />
        </div>
        {errors.Information && (
          <p style={{ color: "red" }}>Information can't be empty</p>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            className="border-2 mt-5 rounded-md w-2/12 h-11  border-red-500 bg-red-500 p-2 text-white text-center font-dm-sans text-2xl font-bold leading-[144.023%]"
          >
            {post ? "Update" : "+ Add Job"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default JobForm;
