import { BookmarkIcon, BriefcaseIcon, ClockIcon, LocateIcon, MapPin } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const JobCard = ({ job }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate =useNavigate();
  const handleCardClick = (id) => {
    navigate(`/job/apply/${id}`);

  };

  const handleApplyClick = (e) => {
    e.stopPropagation();
    console.log(`Applying to job: ${job._id}`);
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Yesterday";
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "short", 
      day: "numeric" 
    });
  };

  return (
    <div 
      className={`
        relative group bg-white border border-gray-200 rounded-2xl p-6 
        hover:shadow-2xl hover:border-blue-200 cursor-pointer 
        transition-all duration-500 ease-out transform hover:-translate-y-1
        ${isHovered ? 'shadow-xl' : 'shadow-md'}
      `}
      onClick={()=>handleCardClick(job._id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
    >
      {/* Bookmark Button */}
      <button
        className={`
          absolute top-4 right-4 p-2 rounded-full transition-all duration-300
          ${isBookmarked 
            ? 'text-blue-600 bg-blue-50 hover:bg-blue-100' 
            : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
          }
        `}
        onClick={handleBookmarkClick}
  
      >
        <BookmarkIcon filled={isBookmarked}  />
      </button>

      {/* Company Logo and Info */}
      <div className="flex items-start gap-4 mb-6">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-md flex items-center justify-center overflow-hidden">
            <img 
              src={job.company?.logo || "https://via.placeholder.com/60x60?text=?"}
              alt={`${job.company?.companyName} logo`}
              className="w-12 h-12 rounded-xl object-cover"
             
            />
          </div>

        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-xl text-gray-900 truncate">
            {job.company?.companyName || "Unknown Company"}
          </h3>
          <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
            <MapPin  className="w-4"/>
            <span className="truncate">{job.location || "Remote"}</span>
          </div>
        </div>
      </div>

      {/* Job Title */}
      <h4 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
        {job.title}
      </h4>

      {/* Job Meta Info */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1.5">
          <BriefcaseIcon className="w-4" />
          <span>{job.jobType || "Full-time"}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ClockIcon className="w-4" />
          <span>{formatDate(job.createdAt)}</span>
        </div>
      </div>

      {/* Job Description */}
      <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">
        {job.description?.length > 120 
          ? `${job.description.substring(0, 120)}...` 
          : job.description || "No description available."
        }
      </p>

      {/* Skills/Requirements */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(job.requirement || []).slice(0, 3).map((skill, index) => (
          <span 
            key={index} 
            className={`
              px-3 py-1.5 text-xs font-medium text-black rounded-full
              border border-blue-500 
              hover:scale-105 transition-transform duration-200
            `}
          >
            {skill}
          </span>
        ))}
        {job.requirement?.length > 3 && (
          <span className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
            +{job.requirement.length - 3} more
          </span>
        )}
      </div>

      {/* Salary and Apply Button */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Salary</span>
          <span className="text-xl font-bold bg-blue-500 bg-clip-text text-transparent">
            ${job.salary?.toLocaleString() || "Competitive"}
          </span>
        </div>
        
        <button
          className={`
            px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300
            transform hover:scale-105 active:scale-95
            bg-gradient-to-r from-blue-600 to-blue-700 text-white
            hover:from-blue-700 hover:to-blue-800
            shadow-lg hover:shadow-blue-500/25
          `}
          onClick={handleApplyClick}
        >
          Apply Now
        </button>
      </div>

      {/* Hover overlay effect */}
      <div 
        className={`
          absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 
          rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
          pointer-events-none
        `}
      />
    </div>
  );
};