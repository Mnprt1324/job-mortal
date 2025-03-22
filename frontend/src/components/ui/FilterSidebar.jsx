import React from "react";

const FilterSidebar = ({ selectedFilter, setSelectedFilter }) => {
  const filters = [
    {
      title: "Location",
      options: ["All", "Mohali", "Chandigarh", "Delhi", "Mumbai"],
    },
    {
      title: "Popular Keywords",
      options: ["Backend Developer", "Frontend Developer", "Data Scientist"],
    },
    {
      title: "Job Type",
      options: ["Full-time", "Part-time", "Remote"],
    },
  ];

  return (
    <div className="w-[18rem] max-h-[700px] pt-4 hidden md:block bg-blue-50 rounded-2xl select-none">
      {filters.map((filter, index) => (
        <div key={index} className="mb-6">
          <h3 className="font-medium text-2xl pl-7">{filter.title}</h3>
          <div className="pl-7 mt-3">
            <ul className="space-y-3">
              {filter.options.map((option, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name={filter.title} // Ensures only one selection per category
                    id={`${filter.title}-${idx}`}
                    className="w-5 h-5 cursor-pointer"
                    value={option}
                    checked={selectedFilter === option}
                    onChange={() => setSelectedFilter(option)}
                  />
                  <label
                    htmlFor={`${filter.title}-${idx}`}
                    className="text-sm cursor-pointer"
                  >
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          {index !== filters.length - 1 && (
            <hr className="w-[90%] border-stone-300 ml-4 mt-5" />
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterSidebar;
