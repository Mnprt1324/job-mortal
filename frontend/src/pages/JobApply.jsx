import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useGetSingleJob from "../hooks/useGetSingleJob";
import useGetAllAppliedJobs from "../hooks/useGetAllAppliedJobs";
import { applyJobApiCall } from "../API/api";

export const JobApply = () => {
  const { id } = useParams();
  const [isApplying, setIsApplying] = useState(false);
  const [isLoading,setIsLoading]=useState(false)
  
  useGetAllAppliedJobs();
useGetSingleJob(id);
  
  const { singleJob } = useSelector((store) => store.job);
  const { appliedJob } = useSelector((store) => store.application);
  const { user } = useSelector((store) => store.auth);
  
  const isApplied = useMemo(
    () => appliedJob?.some((job) => job?.job?._id === id),
    [appliedJob, id]
  );
  
  const handleButtonClick = async () => {
    if (isApplied || isApplying || !user) return;
    
    setIsApplying(true);
    try {
      const response = await applyJobApiCall(id);
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Application error:", error);
      toast.error(error.response?.data?.message || "Failed to apply. Please try again.");
    } finally {
      setIsApplying(false);
    }
  };
  
  // Job type color mapping
  const getJobTypeColor = (jobType) => {
    const colors = {
      'Full-time': 'bg-green-500',
      'Part-time': 'bg-blue-500',
      'Contract': 'bg-orange-500',
      'Internship': 'bg-purple-500',
      'Remote': 'bg-indigo-500',
      default: 'bg-gray-500'
    };
    return colors[jobType] || colors.default;
  };
  
  // Format salary display
  const formatSalary = (salary) => {
    if (!salary) return 'Not specified';
    return typeof salary === 'number' 
      ? `$${salary.toLocaleString()}/year` 
      : `$${salary}`;
  };
  
  // Loading state
  if (isLoading || !singleJob) {
    return (
      <section className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </section>
    );
  }
  
  return (
    <section className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Job Header Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
            {/* Job Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {singleJob?.title}
              </h1>
              
              <div className="flex flex-wrap gap-3 mb-4">
                <span className={`${getJobTypeColor(singleJob?.jobType)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                  {singleJob?.jobType}
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {formatSalary(singleJob?.salary)}
                </span>
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                  📍 {singleJob?.location}
                </span>
              </div>
              
              {/* Company Info */}
              {singleJob?.company && (
                <div className="flex items-center gap-3 mb-4">
                  {singleJob?.company?.logo && (
                    <img 
                      src={singleJob.company.logo} 
                      alt={`${singleJob.company.name} logo`}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <span className="text-gray-600 font-medium">
                    {singleJob?.company?.name}
                  </span>
                </div>
              )}
            </div>
            
            {/* Apply Button */}
            <div className="lg:ml-6">
              {!user ? (
                <div className="text-center">
                  <button 
                    disabled 
                    className="bg-gray-300 text-gray-500 px-6 py-3 rounded-lg cursor-not-allowed mb-2"
                  >
                    Login to Apply
                  </button>
                  <p className="text-sm text-gray-500">Please login to apply for this job</p>
                </div>
              ) : (
                <button
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 min-w-[140px] ${
                    isApplied
                      ? "bg-gray-100 text-gray-600 cursor-not-allowed border border-gray-300"
                      : isApplying
                      ? "bg-blue-400 text-white cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5"
                  }`}
                  onClick={handleButtonClick}
                  disabled={isApplied || isApplying}
                >
                  {isApplying ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Applying...
                    </div>
                  ) : isApplied ? (
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Already Applied
                    </div>
                  ) : (
                    "Apply Now"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Job Details Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
            Job Details
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Role
                </label>
                <p className="text-gray-900 font-medium">{singleJob?.title}</p>
              </div>
              
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Location
                </label>
                <p className="text-gray-900">{singleJob?.location}</p>
              </div>
              
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Salary
                </label>
                <p className="text-gray-900 font-medium">{formatSalary(singleJob?.salary)}</p>
              </div>
              
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Posted Date
                </label>
                <p className="text-gray-900">
                  {singleJob?.createdAt 
                    ? new Date(singleJob.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : 'Not specified'
                  }
                </p>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Requirements
                </label>
                {singleJob?.requirement && singleJob.requirement.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {singleJob.requirement.map((req, index) => (
                      <span 
                        key={index}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-200"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No specific requirements listed</p>
                )}
              </div>
              
              {singleJob?.experience && (
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Experience Required
                  </label>
                  <p className="text-gray-900">{singleJob.experience}</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Description Section */}
          {singleJob?.description && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 block">
                Job Description
              </label>
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {singleJob.description}
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Additional Actions */}
        <div className="mt-6 flex justify-center">
          <button 
            onClick={() => window.history.back()}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            ← Back to Job Listings
          </button>
        </div>
      </div>
    </section>
  );
};