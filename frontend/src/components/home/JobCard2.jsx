import { SlLocationPin } from "react-icons/sl";
import { BsCashCoin } from "react-icons/bs";
import { IoTimeOutline, IoBookmarkOutline, IoBookmark, IoArrowForward, IoBusinessOutline } from "react-icons/io5";
import { useState } from "react";

export const JobCard2 = ({ job, onSave, isSaved = false, }) => {
  const [isBookmarked, setIsBookmarked] = useState(isSaved);
  const [imageError, setImageError] = useState(false);

  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    onSave?.(job._id, !isBookmarked);
  };


  const formatSalary = (salary) => {
    if (!salary) return "Competitive";
    return typeof salary === 'number' ? `$${salary.toLocaleString()}` : salary;
  };

  const formatDate = (date) => {
    const now = new Date();
    const jobDate = new Date(date);
    const diffTime = Math.abs(now - jobDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return jobDate.toLocaleDateString();
  };

  const getJobTypeColor = (jobType) => {
    const colors = {
      "Full-time": "bg-emerald-100 text-emerald-700 border-emerald-200",
      "Part-time": "bg-blue-100 text-blue-700 border-blue-200",
      "Remote": "bg-pink-100 text-pink-700 border-pink-200",
    };
    return colors[jobType] || "bg-gray-100 text-gray-700 border-gray-200";
  };
  return (
    <div className="group bg-white/80 backdrop-blur-sm hover:bg-white/95 border border-white/20 hover:border-blue-200/50 hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer rounded-3xl p-6 relative overflow-hidden h-full">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-purple-50/0 to-pink-50/0 group-hover:from-blue-50/50 group-hover:via-purple-50/30 group-hover:to-pink-50/50 transition-all duration-500 rounded-3xl"></div>
      
      {/* Floating elements */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
              {!imageError && job.company?.logo ? (
                <img
                  src={job.company.logo}
                  alt={`${job.company?.name} Logo`}
                  className="object-cover w-full h-full"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {job.company?.name?.charAt(0)?.toUpperCase() || 'C'}
                  </span>
                </div>
              )}
            </div>
            
           
          </div>
          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleBookmark}
              className="p-2 rounded-full hover:bg-blue-50 transition-all duration-200 group"
            >
              {isBookmarked ? (
                <IoBookmark className="w-4 h-4 text-blue-600" />
              ) : (
                <IoBookmarkOutline className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
              )}
            </button>
          </div>
        </div>

        {/* Company info */}
        <div className="mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <IoBusinessOutline className="w-4 h-4" />
            <span className="font-medium">{job.company?.name}</span>
          </div>
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">
            {job.title}
          </h3>
        </div>

        {/* Job description */}
        {job.description && (
          <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
            {job.description}
          </p>
        )}
        {/* Skills */}
        {job.requirement && (
          <div className="flex flex-wrap gap-2 mb-4">
            {job.requirement.slice(0, 2).map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors"
              >
                {skill}
              </span>
            ))}
            {job.requirement.length > 2 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">
                +{job.requirement.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Meta info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <SlLocationPin className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span className="font-medium truncate">{job.company?.location || "Remote"}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <BsCashCoin className="w-4 h-4 text-green-500" />
              <span className="font-medium">{formatSalary(job.salary)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <IoTimeOutline className="w-4 h-4 text-blue-500" />
              <span className="text-xs">{formatDate(job.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getJobTypeColor(job.jobType)}`}>
            {job.jobType}
          </div>

          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm group"
          >
            <span>Apply</span>
            <IoArrowForward className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
};