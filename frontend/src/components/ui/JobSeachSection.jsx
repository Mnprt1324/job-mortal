import { IoSearch } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setSearchedQuery } from "../../redux/jobSlice"; // Import action

export const JobSeachSection = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);
  const [searchInput, setSearchInput] = useState(searchedQuery || "");

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    dispatch(setSearchedQuery(e.target.value));
  };

  const clearSearch = () => {
    setSearchInput("");
    dispatch(setSearchedQuery(""));
  };

  return (
    <div className="flex flex-col bg-gradient-to-r border-1 border-blue-500 h-48 justify-center p-6 rounded-2xl shadow-lg text-zinc-700 w-[98%] gap-5 mb-4 to-blue-600">
      {/* Heading */}
      <h1 className="text-2xl font-semibold md:text-4xl">
        Find Your <span className="text-blue-600">Dream Job</span> Here
      </h1>
      {/* Search Input */}
      <div className="flex bg-white border-1 border-blue-600 h-14 rounded-full shadow-md w-full items-center px-4">
        <div className="flex w-full gap-3 items-center md:w-[60%]">
          <IoSearch className="text-2xl text-blue-500" />
          <input
            type="text"
            value={searchInput}
            onChange={handleSearch}
            className="h-[40px] text-black text-lg w-full outline-none placeholder-gray-500 px-3"
            placeholder="Search by job title, skill, or company..."
          />
          {searchInput && (
            <button onClick={clearSearch} className="text-gray-600 hover:text-red-500 transition">
              <IoClose className="text-2xl" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
