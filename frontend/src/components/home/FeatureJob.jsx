import { useSelector } from "react-redux";
import { JobCard2 } from "./JobCard2";
import { useNavigate } from "react-router-dom";
import useGetAllJobs from "../../hooks/useGetAllJobs";

export const FeatureJob = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/findJob");
  };

  const handleJobClick = (id) => {
    navigate(`/job/apply/${id}`);
  };

  useGetAllJobs({keyword:""});
  const { allJobs } = useSelector((store) => store.job);

  // Extract unique companies and limit jobs to 6
  const uniqueJobs = [];
  const companySet = new Set();

  for (const job of allJobs) {
    if (!companySet.has(job.company._id.toString())) {
      companySet.add(job.company._id.toString());
      uniqueJobs.push(job);
    }
    if (uniqueJobs.length === 6) break; // Limit to 6 jobs
  }

  return (
    <div className="flex flex-col items-center bg-slate-50 gap-8 py-6 md:py-16">
      <div className="grid place-items-center mt-2">
        <h4 className="font-bold text-5xl text-blue-500 "> <span className="text-black">Featured</span>  Jobs</h4>
        <p>Know your worth and find the job that qualifies your life</p>
      </div>
      <div className="w-[95%] grid grid-cols-1 md:grid-cols-2 gap-4">
        {uniqueJobs.map((curr) => (
          <div key={curr._id} onClick={() => handleJobClick(curr._id)} className="cursor-pointer">
            <JobCard2 job={curr} />
          </div>
        ))}
        <div className="row-end-7 mx-auto md:row-auto">
          <button
            className="bg-blue-500 text-white p-2 cursor-pointer"
            onClick={handleOnClick}
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};
