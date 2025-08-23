import { useDispatch, useSelector } from "react-redux";
import { JobCard } from "../components/ui/JobCard";
import useGetAllJobs from "../hooks/useGetAllJobs";
import FilterSidebar from "../components/ui/FilterSideBar";
import { JobSeachSection } from "../components/ui/JobSeachSection";
import { useEffect, useState } from "react";
import { setSearchedQuery } from "../redux/jobSlice";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { JobCardSkeleton } from "../components/home/JobCardSkeleton";
import { Briefcase } from "lucide-react";
import { FeatureJob } from "../components/home/FeatureJob";

export const FindJob = () => {
  const dispatch = useDispatch();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [searchParams, setSearchParams] = useSearchParams();
  // Use "keyword" instead of "filter" to match backend API
  const [selectedFilter, setSelectedFilter] = useState(searchParams.get("keyword") || "All");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "new");
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page")) || 1);
  const [limit, setLimit] = useState(6);

  // Fetch jobs with correct query parameters
  const { loading, error, totalPages } = useGetAllJobs({ keyword: selectedFilter, sortBy, page: currentPage, limit });

  useEffect(() => {
    dispatch(setSearchedQuery(selectedFilter));
    setSearchParams({ keyword: selectedFilter, sortBy, page: currentPage });
  }, [selectedFilter, sortBy, currentPage, setSearchParams, dispatch]);

  return (
    <section className="p-5 mb-4">
      <JobSeachSection />
      <div className="flex">
        <FilterSidebar selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />

        <div className="flex flex-col w-full">
          <div className="flex justify-end p-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2  bg-blue-100 border-none rounded focus:outline-blue-500"
            >
              <option value="new">Newest First</option>
              <option value="old">Oldest First</option>
            </select>
          </div>

          {/* Apply Motion to Job Listings */}
          <motion.div
            key={currentPage} // Re-animate on page change
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 px-4"
          >
            {loading ? (
             Array.from({ length: 8 }).map((_, index) => (
              <JobCardSkeleton key={index} />
            ))
            ) : error ? (
             <div className="col-span-full text-center py-16">
              <div className="max-w-md mx-auto">
                <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs available</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any  job listings at the moment. Check back later for fresh opportunities.
                </p>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Browse All Jobs
                </button>
              </div>
            </div>
            ) : allJobs.length > 0 ? (
              allJobs.map((job) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <JobCard job={job} />
                </motion.div>
              ))
            ) : (
              <p className="col-span-3 text-center text-xl text-gray-500">No jobs found.</p>
            )}
          </motion.div>

          {/* Pagination with Transitions */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center gap-2 mt-6"
            >
              <button
                onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 ${
                    currentPage === index + 1 ? "bg-blue-700 text-white" : "bg-blue-500 text-white"
                  } rounded`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
              >
                Next
              </button>
            </motion.div>
          )}
        </div>
      </div>
      <FeatureJob/>
    </section>
  );
};
