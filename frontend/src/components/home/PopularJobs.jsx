import { useSelector } from "react-redux";
import { JobCard } from "../ui/JobCard";
import useGetAllJobs from "../../hooks/useGetAllJobs";

export const PopularJobs = () => {
  useGetAllJobs({ keyword: "",});
  const { allJobs } = useSelector((store) => store.job);

  // Store jobs with a limit of 2 per company and more than 2 applicants
  const selectedJobs = [];
  const companyJobCount = {};

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
    <div className="w-full px-4 py-6">
      {/* Section Heading */}
      <h2 className="text-2xl text-center decoration-blue-500 font-bold mb-6 md:text-left underline">
        Popular Jobs
      </h2>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
        {selectedJobs.length > 0 ? (
          selectedJobs.map((job) => <JobCard job={job} key={job._id} />)
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg py-10">
            No jobs found.
          </p>
        )}
      </div>
    </div>
  );
};
