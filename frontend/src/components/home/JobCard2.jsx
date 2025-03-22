import { SlLocationPin } from "react-icons/sl";
import { BsCashCoin } from "react-icons/bs";
import { IoTimeOutline } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa";

export const JobCard2 = ({ job }) => {
  return (
    <div className="bg-white hover:bg-slate-200  hover:shadow-lg hover:scale-90 transition-all duration-200 ease-in-out cursor-pointer rounded-xl p-4 md:p-5">
      <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6">
        
        {/* Company Logo */}
        <div className="w-16 h-16 bg-amber-100 shadow-md border border-gray-100 rounded-full flex items-center justify-center overflow-hidden shrink-0">
          <img
            src={job.company.logo}
            alt="Company Logo"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Job Info */}
        <div className="flex-1 w-full flex flex-col items-center md:items-start space-y-2">
          {/* Job Title */}
          <div className="font-semibold text-lg md:text-xl text-gray-800 text-center md:text-left">
            {job.title}
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 text-sm text-gray-600">
            {/* Location */}
            <div className="flex items-center gap-1">
              <SlLocationPin className="text-red-500" />
              <span className="font-medium">{job.company.location}</span>
            </div>

            {/* Salary */}
            <div className="flex items-center gap-1">
              <BsCashCoin className="text-green-500" />
              <span className="font-medium">{job.salary}</span>
            </div>

            {/* Posted Date */}
            <div className="flex items-center gap-1">
              <IoTimeOutline className="text-blue-500" />
              <span className="font-medium">{new Date(job.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Right Side (Bookmark & Job Type) */}
        <div className="flex justify-between w-[100%] md:w-auto flex-row md:flex-col items-center gap-2 md:gap-4 mt-3 md:mt-0">
          {/* Bookmark */}
          <button className="p-2 rounded-full hover:bg-gray-200 transition">
            <FaBookmark className="text-gray-500" size={18} />
          </button>

          {/* Job Type Badge */}
          <div className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-xs md:text-sm font-medium">
            {job.jobType}
          </div>
        </div>
      </div>
    </div>
  );
};
