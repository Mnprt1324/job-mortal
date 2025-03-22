import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useGetSingleJob from "../hooks/useGetSingleJob";
import useGetAllAppliedJobs from "../hooks/useGetAllAppliedJobs";
import { applyJobApiCall } from "../API/api";

export const JobApply = () => {
  const { id } = useParams();
  
  useGetAllAppliedJobs();
  useGetSingleJob(id);
  
  const { singleJob } = useSelector((store) => store.job);
  const { appliedJob } = useSelector((store) => store.application);
  const { user } = useSelector((store) => store.auth);

  console.log("User:", user);
  console.log("Applied Jobs:", appliedJob);

  // Check if the job has already been applied for
  const isApplied = useMemo(
    () => appliedJob?.some((job) => job.job._id === id),
    [appliedJob, id]
  );

  const handleButtonClick = async () => {
    if (isApplied) return;

    try {
      const response = await applyJobApiCall(id);
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="h-auto flex justify-center items-center py-3.5">
      <div className="w-[85%] h-[100%]">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-medium">{singleJob.title}</h1>
            <div>
              <span className="bg-red-500 text-white p-1 rounded mr-3">
                {singleJob.jobType}
              </span>
              <span className="bg-blue-500 text-white p-1 rounded mr-3">
                ${singleJob.salary}
              </span>
            </div>
          </div>
          <div>
            <button
              className={`px-3.5 py-1 rounded cursor-pointer ${
                isApplied
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-blue-600 text-white"
              }`}
              onClick={handleButtonClick}
              disabled={isApplied}
            >
              {isApplied ? "Already Applied" : "Apply"}
            </button>
          </div>
        </div>
        <p className="mt-4">Job Description</p>
        <div className="bg-gray-500 w-[100%] h-[.8px]"></div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <p className="font-bold">Role:</p>
            <p className="text-gray-500">{singleJob.title}</p>
          </div>
          <div className="flex gap-4">
            <p className="font-bold">Location</p>
            <p className="text-gray-500">{singleJob.location}</p>
          </div>
          <div className="flex flex-col md:flex-row md:gap-4">
            <p className="font-bold">Description:</p>
            <p className="text-gray-500">{singleJob.description}</p>
          </div>
          <div className="flex flex-col md:flex-row md:gap-4">
            <p className="font-bold">Requirement:</p>
            <p className="text-gray-500">{singleJob.requirement?.join(", ")}</p>
          </div>
          <div className="flex gap-4">
            <p className="font-bold">Salary:</p>
            <p className="text-gray-500">${singleJob.salary}</p>
          </div>
          <div className="flex gap-4">
            <p className="font-bold">Posted Date:</p>
            <p className="text-gray-500">
              {new Date(singleJob.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
