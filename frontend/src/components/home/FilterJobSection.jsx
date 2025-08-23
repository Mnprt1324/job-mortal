import { NavLink } from "react-router-dom";

export const FilterJobSection = () => {
  return (
    <div className="flex justify-center bg-gray-50">
      <div className="flex justify-between p-1  gap-6 items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 transition-all duration-300 border-b-3 border-gray-50 ${
              isActive ? "border-b-3 border-b-blue-400" : "text-gray-700"
            }`
          }
        >
          Popular
        </NavLink>
        <NavLink
          to="/jobs/new"
          className={({ isActive }) =>
            `px-4 py-2 transition-all duration-300 border-b-3 border-gray-50 ${
              isActive ? "border-b-3 border-b-blue-400" : "text-gray-700"
            }`
          }
        >
          New
        </NavLink>
        <NavLink
          to="/jobs/old"
          className={({ isActive }) =>
            `px-4 py-2 transition-all duration-300 border-b-3 border-gray-50 ${
              isActive ? "border-b-3 border-b-blue-400" : "text-gray-700"
            }`
          }
        >
          Old
        </NavLink>
      </div>
    </div>
  );
};
