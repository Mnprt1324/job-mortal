import { NavLink } from "react-router-dom";

export const FilterJobSection = () => {
  return (
    <div className="flex justify-center">
      <div className="flex bg-white border-1 border-blue-500 justify-between p-1 rounded-3xl shadow-lg gap-6 items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-3xl transition-all duration-300 ${
              isActive ? "bg-blue-500 text-white" : "text-gray-700"
            }`
          }
        >
          Popular
        </NavLink>
        <NavLink
          to="/jobs/new"
          className={({ isActive }) =>
            `px-4 py-2 rounded-3xl transition-all duration-300 ${
              isActive ? "bg-blue-500 text-white" : "text-gray-700"
            }`
          }
        >
          New
        </NavLink>
        <NavLink
          to="/jobs/old"
          className={({ isActive }) =>
            `px-4 py-2 rounded-3xl transition-all duration-300 ${
              isActive ? "bg-blue-500 text-white" : "text-gray-700"
            }`
          }
        >
          Old
        </NavLink>
      </div>
    </div>
  );
};
