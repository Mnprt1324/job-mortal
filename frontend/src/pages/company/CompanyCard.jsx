import { EllipsisVertical } from "lucide-react";
import { MenuButton } from "./MenuButton";
 const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "short", 
      day: "numeric" 
    });
  };


export const CompanyCard = ({ company, activeMenu, menuOptions }) => (
  <div className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 group">
    <div className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-sm flex items-center justify-center overflow-hidden">
            <img
              src={company?.logo}
              alt={`${company.companyName} logo`}
              className="w-12 h-12 rounded-xl object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-1">
              {company.companyName || "No Name"}
            </h3>
            <p className="text-sm text-gray-500">{company.location}</p>
          </div>
        </div>

        <div
          className="relative"
          ref={activeMenu === company._id ? menuRef : null}
        >
          <button
            onClick={() => toggleMenu(company._id)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <EllipsisVertical />
          </button>
          <MenuButton
            menu={activeMenu === company._id}
            menuOptions={menuOptions}
            id={company._id}
            onClose={() => setActiveMenu(null)}
          />
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {company.description || "No description available"}
      </p>

      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>Employees: {company.employees}</span>
        <span>Created: {formatDate(company.createdAt)}</span>
      </div>
    </div>
  </div>
);
