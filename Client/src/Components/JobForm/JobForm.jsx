import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

function JobForm({ post }) {
  const token = useSelector((state) => state.auth.token);
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
  const inputSkills = watch("Skillrequired", "");
  console.log("editpsot", post);

  const Onsubmit = async (data) => {
    data.Skillrequired = inputSkills.split(",").map((skill) => skill.trim());
    // console.log("token in job page", token);
    if (post) {
      try {
        const editres = await axios.put(
          `http://localhost:5000/job/editjob/${post._id}`,
          data
        );
        console.log("edit re", editres);
        if (editres) {
          alert("job update successfully");
        }
      } catch (error) {
        console.error("error during edting", error);
      }
    } else {
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
          alert("job added succesfully");
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
    setValue("Skillrequired", post?.Skillrequired || "");
    setValue("Information", post?.Information || "");

    console.log("Updated defaultValues", watch());
  }, [post, setValue]);

  return (
    <div>
      <h1>Add job description</h1>
      <form onSubmit={handleSubmit(Onsubmit)}>
        <div>
          <label className="">Compant Name</label>
          <input
            type="text"
            placeholder="Enter your company name here"
            {...register("CompanyName", { required: true })}
            // value={post.CompanyName}
          />
          {errors.CompanyName && (
            <p style={{ color: "red" }}>CompanyName is required</p>
          )}
        </div>
        <div>
          <label htmlFor="">Add logo url</label>
          <input
            type="text"
            placeholder="Enter the link"
            {...register("Logo", { required: true })}
          />
          {errors.Logo && <p style={{ color: "red" }}>Logo is required</p>}
        </div>
        <div>
          <label htmlFor="">Job Postion</label>
          <input type="text" {...register("Jobposition", { required: true })} />
          {errors.Jobposition && (
            <p style={{ color: "red" }}>Jobposition is required</p>
          )}
        </div>
        <div>
          <label htmlFor="">Montly Salary</label>
          <input
            type="Number"
            {...register("Montly_Salary", { required: true })}
          />
          {errors.Montly_Salary && (
            <p style={{ color: "red" }}>Montly_Salary is required</p>
          )}
        </div>
        <div>
          <label htmlFor="">Job type</label>
          <select {...register("Jobtype", { required: true })}>
            <option value="">Select</option>
            {Jobtype.map((type, index) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.Jobtype && <p style={{ color: "red" }}>Skill is required</p>}
        </div>
        <div>
          <label htmlFor="">Remote/office</label>
          <select {...register("Remote_office", { required: true })}>
            <option value="">Select</option>
            {remote_office.map((item, index) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.Remote_office && (
            <p style={{ color: "red" }}>select an option </p>
          )}
        </div>
        <div>
          <label htmlFor="">Location</label>
          <input type="text" {...register("Location", { required: true })} />
          {errors.Location && (
            <p style={{ color: "red" }}>Location can't be empty</p>
          )}
        </div>
        <div>
          <label htmlFor="">JobDescription</label>
          <input
            type="text"
            {...register("JobDescription", { required: true })}
          />
          {errors.JobDescription && (
            <p style={{ color: "red" }}>JobDescription can't be empty</p>
          )}
        </div>
        <div>
          <label htmlFor="">AboutCompany</label>
          <input
            type="text"
            {...register("AboutCompany", { required: true })}
          />
          {errors.AboutCompany && (
            <p style={{ color: "red" }}>AboutCompany can't be empty</p>
          )}
        </div>

        <div>
          <label htmlFor="">Skills</label>
          <input
            type="text"
            {...register("Skillrequired", { required: true })}
          />
          {errors.Skillrequired && (
            <p style={{ color: "red" }}>Skill is required</p>
          )}
        </div>
        <div>
          <label htmlFor="">Information</label>
          <input type="text" {...register("Information", { required: true })} />
          {errors.Information && (
            <p style={{ color: "red" }}>Information can't be empty</p>
          )}
        </div>
        <button type="submit">{post ? "update" : "add"}</button>
      </form>
    </div>
  );
}

export default JobForm;
