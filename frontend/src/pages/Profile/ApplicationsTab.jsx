import { Briefcase } from "lucide-react";
import { ApplicationCard } from "./ApplicationCard";
import { useSelector } from "react-redux";
import useGetAllAppliedJobs from "../../hooks/useGetAllAppliedJobs"
export const ApplicationsTab = () => {
  useGetAllAppliedJobs();
  const appliedJobs = useSelector((store) => store.application.appliedJob);

  return <div>
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold">Job Applications</h3>
      <span className="text-sm text-gray-500">{appliedJobs?.length || 0} applications</span>
    </div>

    {appliedJobs?.length > 0 ? (
      <div className="space-y-4">
        {appliedJobs.map((job, index) => (
          <ApplicationCard key={index} application={job} />
        ))}
      </div>
    ) : (
      <div className="text-center py-12">
        <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h4 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h4>
        <p className="text-gray-600 mb-6">Start applying to jobs that match your skills and interests.</p>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Browse Jobs
        </button>
      </div>
    )}
  </div>
};