import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAllCompanies } from "../hooks/useGetAllCompanies";
import { HiDotsHorizontal } from "react-icons/hi";
import { MenuButton } from "../components/ui/MenuButton";
import { useState } from "react";

export const Companies = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);
  const [filterValue, setFilterValue] = useState("");

  useGetAllCompanies();
  const { companies } = useSelector((store) => store.company);

  const handleNavigate = () => {
    navigate("/companies/create");
  };

  const handleButtonClick = (id) => {
    navigate(`/companies/update/profile/${id}`);
  };

  const toggleMenu = (id) => {
    setActiveMenu(activeMenu === id ? null : id); // Toggle menu
  };

  const menuoption = [
    {
      menuName: "Edit",
      handler: (id) => handleButtonClick(id),
    },
  ];

  const filteredCompanies = companies.filter((company) =>
    company?.companyName?.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <section className="min-h-screen flex justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-sm p-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-3 border-b border-slate-200">
          <input
            type="text"
            placeholder="Filter by name"
            className="bg-slate-100 outline-0 p-2 rounded-md w-full sm:w-auto"
            onChange={(e) => setFilterValue(e.target.value)}
          />
          <button
            onClick={handleNavigate}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl w-full sm:w-auto"
          >
            New Company
          </button>
        </div>

        {/* Companies Table */}
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead className="bg-blue-600">
              <tr className="border-b border-slate-300 text-left">
                <th className="text-white font-medium p-2">Logo</th>
                <th className="text-white font-medium p-2">Name</th>
                <th className="text-white font-medium p-2">Date</th>
                <th className="text-white font-medium p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map((company) => (
                <tr
                  key={company._id}
                  className="border-b border-slate-200 hover:bg-blue-100 transition"
                >
                  <td className="p-2">
                    <img
                      src={company.logo || "/default-logo.png"}
                      alt="logo"
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  </td>
                  <td className="p-2">{company.companyName || "No Name"}</td>
                  <td className="p-2">
                    {company.createdAt
                      ? new Date(company.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="p-2 relative">
                    <button
                      onClick={() => toggleMenu(company._id)}
                      className="cursor-pointer"
                    >
                      <HiDotsHorizontal className="text-xl" />
                    </button>
                    {/* Action Menu */}
                    <MenuButton
                      menu={activeMenu === company._id}
                      menuoption={menuoption}
                      id={company._id}
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
