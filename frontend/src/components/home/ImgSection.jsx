import { useState } from "react";
import { FaRegHandshake, FaUserTie, FaBriefcase } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "../../redux/jobSlice";

export const ImgSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    if (searchInput.trim()) {
      dispatch(setSearchedQuery(searchInput));
      navigate(`/findJob?keyword=${encodeURIComponent(searchInput)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2 md:px-12 px-6 py-10">
      {/* Left Section */}
      <div className="flex flex-col justify-center gap-16">
        {/* Heading & Subtext */}
        <div>
          <h1 className="text-3xl font-semibold leading-snug md:text-5xl">
            There Are <span className="text-blue-500 animate-pulse">93,178</span> Postings
            Here For You!
          </h1>
          <p className="text-base text-gray-600 md:text-lg mt-3">
            Find Jobs, Employment & Career Opportunities
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col bg-gray-200 border-1 border-blue-500 p-3 rounded-lg shadow-md w-full gap-3 items-center sm:flex-row">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="h-12 rounded-md text-gray-800 w-full outline-none px-4"
            placeholder="Enter job title, keyword, job type"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 rounded-md text-lg text-white w-full duration-300 font-medium hover:bg-blue-600 hover:scale-105 px-6 py-3 sm:w-auto transform transition-all"
          >
            Search
          </button>
        </div>

        {/* Popular Searches */}
        <div className="flex flex-wrap text-sm gap-2 items-center md:text-base">
          <span className="text-gray-800 font-semibold">Popular Searches:</span>
          <p className="text-gray-600">
            Designer, Developer, Web, iOS, PHP, Senior, Engineer
          </p>
        </div>
      </div>

      {/* Right Section (Image with Floating Cards) */}
      <div className="flex justify-center md:justify-end relative">
        {/* Floating Cards at Different Positions */}
        <div className="flex bg-white p-4 rounded-lg shadow-lg w-48 absolute animate-bounce gap-2 items-center left-[-20px] md:left-[-40px] top-4">
          <FaRegHandshake className="text-blue-500 text-xl" />
          <p className="text-sm font-semibold">Upload Your CV</p>
        </div>

        <div className="flex bg-white p-4 rounded-lg shadow-lg w-48 absolute animate-bounce gap-2 items-center md:right-[-40px] right-[-20px] top-[20%]">
          <FaUserTie className="text-green-500 text-xl" />
          <p className="text-sm font-semibold">Your dream job is waiting!</p>
        </div>

        <div className="flex bg-white p-4 rounded-lg shadow-lg w-48 absolute animate-bounce bottom-[-10px] gap-2 items-center left-5 md:left-[-30px]">
          <FaBriefcase className="text-red-500 text-xl" />
          <p className="text-sm font-semibold">
            Apply now and start your journey!
          </p>
        </div>

        {/* Job Search Illustration */}
        <img
          src="https://res.cloudinary.com/df3pscsym/image/upload/v1741777753/uvdwymzbcofjgk35spun.png"
          alt="Job Search Illustration"
          className="h-auto max-w-full md:max-w-[450px] object-contain"
        />
      </div>
    </div>
  );
};
