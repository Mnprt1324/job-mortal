import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import useGetAllAdminJobs from "../hooks/useGetAllAdminJobs";
import { MenuButton } from "../components/ui/MenuButton";
import { useState } from "react";

export const Job = () => {
  useGetAllAdminJobs();
  const [activeMenu, setActiveMenu] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const { allAdminJobs } = useSelector((store) => store.job);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/job/create`);
  };

  const toggleMenu = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const handleButtonClick = (id) => {
    navigate(`/jobs/update/${id}`);
  };

  const handleButtonClick2 = (id) => {
    navigate(`/jobs/applicants/${id}`);
  };

  const menuoption = [
    {
      menuName: "Edit",
      handler: handleButtonClick,
    },
    {
      menuName: "Applicants",
      handler: handleButtonClick2,
    },
  ];

  const filteredJobs = allAdminJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(filterValue.toLowerCase()) ||
      job.company.companyName.toLowerCase().includes(filterValue.toLowerCase())
  );


  return (
    <section className="flex justify-center p-4 min-h-screen">
      <div className="bg-white p-4 rounded-xl shadow-sm w-full max-w-6xl">
        {/* Header */}
        <div className="flex flex-col border-b border-slate-200 justify-between p-3 gap-3 items-center sm:flex-row">
          <input
            type="text"
            placeholder="Filter by role or company"
            className="bg-slate-100 p-2 rounded-md w-full outline-0 sm:w-auto"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
          <button
            onClick={handleNavigate}
            className="bg-blue-600 rounded-xl text-white w-full cursor-pointer px-4 py-2 sm:w-auto"
          >
            New Job
          </button>
        </div>

        {/* Table (Responsive Wrapper) */}
        <div className="mt-5 overflow-x-auto">
          <table className="border-collapse w-full min-w-[600px]">
            <thead className="bg-blue-600 font-medium">
              <tr className="border-b border-slate-300 text-left font-medium">
                <th className="p-2 text-white font-medium">Company Name</th>
                <th className="p-2 text-white font-medium">Role</th>
                <th className="p-2 text-white font-medium">Date</th>
                <th className="p-2 text-white font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr
                  key={job._id}
                  className="border-b border-slate-200 hover:bg-blue-100 transition"
                >
                  <td className="p-2">{job.company.companyName}</td>
                  <td className="p-2">{job.title || "No Title"}</td>
                  <td className="p-2">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2 relative">
                    <button
                      onClick={() => toggleMenu(job._id)}
                      className="cursor-pointer"
                    >
                      <HiDotsHorizontal className="text-xl" />
                    </button>
                    {/* Menu Button */}
                    <MenuButton
                      menu={activeMenu === job._id}
                      menuoption={menuoption}
                      id={job._id}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
