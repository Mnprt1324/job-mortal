import { MapPin, SearchIcon, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "../../redux/jobSlice";

export const JobSeachSection = () => {
    const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [location, setLocation] = useState("");
  const searchRef = useRef(null);
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const clearSearch = () => {
    setSearchInput("");
    setLocation("");
     dispatch(setSearchedQuery(""));
  };

  const handleSubmitSearch = () => {
     dispatch(setSearchedQuery(searchInput||location));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmitSearch();
    }
  };
 
  return (
    <div className="w-full  mx-auto pb-4">
      {/* Main Search Container */}
      <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        
        <div className="relative p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-3">
              Find Your Next
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dream Job
            </h2>
            <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
              Discover thousands of job opportunities from top companies around the world
            </p>
          </div>

          {/* Main Search Bar */}
          <div className="relative mb-6">
            <div className="flex bg-white border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
              {/* Search Input */}
              <div className="flex-1 relative" ref={searchRef}>
                <div className="flex items-center px-6 py-4">
                  <SearchIcon className="text-gray-400 mr-4" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={handleSearch}
                    className="flex-1 text-lg text-gray-800 placeholder-gray-500 outline-none bg-transparent"
                    placeholder="Job title, skills, or company..."
                    aria-label="Search for jobs"
                  />
                  {searchInput && (
                    <button 
                      onClick={clearSearch}
                      className="ml-2 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                    >
                      <X />
                    </button>
                  )}
                </div>

          
              </div>

              {/* Location Input */}
              <div className="hidden md:flex items-center px-6 py-4 border-l border-gray-200">
                <MapPin className="text-gray-400 mr-3" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-48 text-lg text-gray-800 placeholder-gray-500 outline-none bg-transparent"
                  placeholder="Location"
                  aria-label="Job location"
                />
              </div>

              {/* Search Button */}
              <button
                onClick={handleSubmitSearch}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                aria-label="Search jobs"
              >
                Search Jobs
              </button>
            </div>
          </div>
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">50K+</div>
              <div className="text-sm text-gray-600">Active Jobs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">10K+</div>
              <div className="text-sm text-gray-600">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">1M+</div>
              <div className="text-sm text-gray-600">Job Seekers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">95%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};