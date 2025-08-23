import { useSelector } from "react-redux";
import { JobCard } from "../ui/JobCard";
import useGetAllJobs from "../../hooks/useGetAllJobs";
import { Search, Sparkles, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PopularJobs = () => {
  useGetAllJobs({ keyword: "",});
  const { allJobs } = useSelector((store) => store.job);

  // Store jobs with a limit of 2 per company and more than 2 applicants
  const selectedJobs = [];
  const companyJobCount = {};
  const navigate=useNavigate();

  for (const job of allJobs) {
    const companyId = job.company._id.toString();

    if (!companyJobCount[companyId]) {
      companyJobCount[companyId] = 0;
    }

    if (companyJobCount[companyId] < 2 && job.applicants.length > 0) {
      selectedJobs.push(job);
      companyJobCount[companyId] += 1;
    }

    if (selectedJobs.length === 8) break; // Limit to 8 jobs
  }

  return (
    <div className="w-full px-4 py-8 bg-gradient-to-b from-gray-50 to-white">
      {/* Section Heading */}
        <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                PopularJobs
              </h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                <Sparkles className="w-4 h-4 mr-1" />
                Fresh Listings
              </span>
            </div>
            <p className="text-gray-600">
              Discover the popular opportunities from top companies
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button onClick={()=>navigate("/findjob")} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              <Search className="w-4 h-4" />
              View All Jobs
            </button>
          </div>
        </div>
      {/* Jobs Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-3">
        {selectedJobs.length > 0 ? (
          selectedJobs.map((job) => <JobCard job={job} key={job._id} />)
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg py-10">
            No jobs found.
          </p>
        )}
        </div>
      </div>
       <div className="text-center mt-10">
            <button onClick={()=>navigate("findjob")} className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200">
              Load More Jobs
            </button>
          </div>
    </div>
  );
};
