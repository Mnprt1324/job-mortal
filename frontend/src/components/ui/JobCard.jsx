import { FaRegClock } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { PiToolboxLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

export const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/job/apply/${job._id}`);
  };

  // Array of background colors to cycle through
  const bgColors = ["bg-blue-400", "bg-green-400", "bg-blue-400", "bg-red-400", "bg-red-400", "bg-indigo-400"];

  return (
    <div 
      className="flex flex-col border border-stone-300 md:w-[370px] p-3.5 rounded-md hover:bg-indigo-50 cursor-pointer transition duration-300 odd:hover:rotate-2 even:hover:rotate-[-3deg]"
      onClick={handleClick}
    >
      {/* Company Logo and Info */}
      <div className="flex gap-4 my-4">
        <div className="w-[60px] h-[60px] shadow rounded-full grid place-items-center bg-gray-100">
          <img 
            src={job.company?.logo || "/placeholder-logo.png"} 
            alt="Company Logo" 
            className="w-[45px] h-[45px] rounded-full object-cover" 
          />
        </div>
        <div>
          <div className="font-medium text-2xl">{job.company?.companyName || "Unknown Company"}</div>
          <div className="flex items-center gap-1.5 text-sm text-stone-400">
            <IoLocationOutline /> {job.location || "Location not specified"}
          </div>
        </div>
      </div>

      {/* Job Title */}
      <h6 className="font-bold text-lg">{job.title}</h6>

      {/* Job Type and Date */}
      <div className="text-stone-400 text-sm flex gap-4 mt-2">
        <span className="flex items-center gap-1">
          <PiToolboxLight /> {job.jobType || "N/A"}
        </span>
        <span className="flex items-center gap-1">
          <FaRegClock /> {new Date(job.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
        </span>
      </div>

      {/* Job Description */}
      <p className="my-4 text-gray-700 text-sm">
        {job.description?.length > 100 ? `${job.description.substring(0, 100)}...` : job.description}
      </p>

      {/* Job Requirements with Different Background Colors */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(job.requirement || []).slice(0, 4).map((req, index) => (
          <span key={index} className={`px-2 py-1 text-xs text-white rounded-md ${bgColors[index % bgColors.length]}`}>
            {req}
          </span>
        ))}
      </div>

      {/* Salary and Apply Button */}
      <div className="flex justify-between items-center">
        <span className="text-lg text-blue-500 font-medium">${job.salary}</span>
        <button 
          className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-white hover:text-blue-500 border border-blue-500 transition duration-300"
          onClick={(e) => { e.stopPropagation(); handleClick(); }}
        >
          Apply
        </button>
      </div>
    </div>
  );
};
