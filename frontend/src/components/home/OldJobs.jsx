import { useSelector } from "react-redux";
import { JobCard } from "../ui/JobCard";
import useSortJobs from "../../hooks/useSortJobs";
export const OldJobs = () => {
    useSortJobs("old",8);
    const { sotedJobs } = useSelector((store) => store.job);

      

    return (
      <div className="w-full px-4 py-6">
        {/* Section Heading */}
        <h2 className="text-2xl font-bold mb-6 underline decoration-blue-500 text-center md:text-left">
           Old Jobs
        </h2>
  
        {/* Jobs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sotedJobs?.length > 0 ? (
            sotedJobs.map((job) => <JobCard job={job} key={job._id} />)
          ) : (
            <p className="col-span-full text-center text-lg text-gray-500 py-10">
              No jobs found.
            </p>
          )}
        </div>
      </div>
    );
  };

  