import { useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { ProfileUpdate } from "../components/ProfileUpdate";
import useGetAllAppliedJobs from "../hooks/useGetAllAppliedJobs";

export const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="grid p-6 place-items-center">
      <div className="bg-white border border-slate-300 p-6 rounded-lg shadow-lg w-full max-w-5xl">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="flex text-2xl text-slate-700 font-semibold gap-2 items-center">
            <div className="bg-blue-500 h-[30px] rounded-2xl w-[10px]"></div>
            User Profile
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className="flex border border-slate-300 p-2 rounded-md hover:bg-slate-100 items-center transition"
          >
            <MdOutlineModeEdit className="text-blue-700 text-xl" />
            <span className="hidden ml-1 sm:inline">Edit</span>
          </button>
        </div>

        {/* Profile Content */}
        <div className="flex flex-col gap-6 items-center md:flex-row mt-6">
          {/* Profile Image */}
          <img
            src={user?.profile?.profileImg || "https://via.placeholder.com/120"}
            alt="Profile"
            className="border border-gray-300 h-[120px] rounded-full w-[120px] object-cover"
          />

          {/* User Details */}
          <div className="flex-1 w-full">
            <h3 className="text-2xl text-slate-700 capitalize font-semibold">
              {user?.name || "No Name"}
            </h3>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 mt-4 sm:grid-cols-2">
              <InfoBlock label="Role" value={user?.role || "Not Specified"} />
              <InfoBlock label="Phone" value={user?.profile?.phone || "Not Provided"} />
              <InfoBlock label="Email" value={user?.email || "Not Available"} />
              <InfoBlock label="Bio" value={user?.profile?.bio || "No Bio Available"} />
              <InfoBlock label="Location" value={user?.profile?.location || "No Location"} />
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <Section title="Skills">
          {user?.profile?.skills?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.profile.skills.map((skill, idx) => (
                <span key={idx} className="bg-sky-500 rounded-lg text-sm text-white px-3 py-1">
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">No Skills Added</p>
          )}
        </Section>

        {/* Experience Section */}
        <Section title="Job Experience">
          <p className="text-slate-600">{user?.profile?.experience || "Fresher"}</p>
        </Section>

        {/* Applied Jobs (Only for Job Seekers) */}
        {user?.role === "jobseeker" && <AppliedJobDetails />}
      </div>

      {/* Edit Profile Modal */}
      {showModal && <ProfileUpdate setShowModal={setShowModal} />}
    </section>
  );
};

// Reusable Info Block Component
const InfoBlock = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-slate-500 font-medium">{label}</span>
    <p className="text-slate-700 break-words font-bold">{value}</p>
  </div>
);

// Reusable Section Wrapper
const Section = ({ title, children }) => (
  <div className="mt-6">
    <h4 className="font-semibold">{title}</h4>
    <div className="mt-2">{children}</div>
  </div>
);

// Applied Jobs Component
const AppliedJobDetails = () => {
  useGetAllAppliedJobs();
  const appliedJobs = useSelector((store) => store.application.appliedJob);
  return (
    <Section title="Applied Jobs">
      {appliedJobs?.length > 0 ? (
        <div className="border border-slate-300 rounded-lg shadow-md overflow-x-auto">
          <table className="bg-white min-w-full">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="border-b text-left px-4 py-2">Date</th>
                <th className="border-b text-left px-4 py-2">Role</th>
                <th className="border-b text-left px-4 py-2">Company</th>
                <th className="border-b text-left px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {appliedJobs.map((job, index) => (
                <tr key={index} className="even:bg-gray-100 hover:bg-blue-100">
                  <td className="border-b px-4 py-2">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border-b capitalize px-4 py-2">{job.job?.title || "N/A"}</td>
                  <td className="border-b capitalize px-4 py-2">{job.job?.company?.companyName || "N/A"}</td>
                  <td className={`px-4 py-2 border-b capitalize font-semibold ${getStatusColor(job.status)}`}>
                    {job.status || "Pending"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-slate-500">No jobs applied yet.</p>
      )}
    </Section>
  );
};

// Function to color-code job status
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "text-yellow-500";
    case "accepted":
      return "text-green-500";
    case "rejected":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};
