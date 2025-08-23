import { useSelector } from "react-redux";
import { JobCard } from "../ui/JobCard";
import useSortJobs from "../../hooks/useSortJobs";
import { Search, Sparkles, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
export const OldJobs = () => {
  useSortJobs("old", 8);
  const navigate=useNavigate();
  const { sotedJobs } = useSelector((store) => store.job);

  return (
    <section className="w-full px-4 py-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">OlderJobs</h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                <Sparkles className="w-4 h-4 mr-1" />
                Older Listings
              </span>
            </div>
            <p className="text-gray-600">
              Discover the  opportunities from top companies
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {sotedJobs?.length > 0 ? (
            sotedJobs.map((job) => <JobCard job={job} key={job._id} />)
          ) : (
            <p className="col-span-full text-center text-lg text-gray-500 py-10">
              No jobs found.
            </p>
          )}
        </div>
           <div className="text-center mt-10">
            <button onClick={()=>navigate("/findjob")} className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200">
              Load More Jobs
            </button>
          </div>
      </div>
    </section>
  );
};
