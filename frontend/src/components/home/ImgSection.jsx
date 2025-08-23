import { useState, useEffect } from "react";
import { FaRegHandshake, FaUserTie, FaBriefcase, FaSearch, FaMapMarkerAlt, FaStar, FaUsers } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../../redux/jobSlice";
import { useNavigate } from "react-router-dom";

// Mock functions - replace with your actual implementations
const mockDispatch = (action) => console.log("Dispatched:", action);
const mockNavigate = (path) => console.log("Navigate to:", path);
// const setSearchedQuery = (query) => ({ type: "SET_SEARCHED_QUERY", payload: query });

export const ImgSection = () => {
  const [searchInput, setSearchInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
 const dispatch=useDispatch();
 const navigate=useNavigate();
 
  const handleSearch = () => {
    if (searchInput.trim()) {
      dispatch(setSearchedQuery(searchInput));
      const params = new URLSearchParams();
      params.append('keyword', searchInput);
      if (locationInput.trim()) {
        params.append('location', locationInput);
      }
      navigate(`/findJob?${params.toString()}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const popularSearches = [
    "Frontend Developer", "UI/UX Designer", "Product Manager", 
    "Data Scientist", "DevOps Engineer", "Full Stack Developer"
  ];

  const handlePopularSearch = (term) => {
    setSearchInput(term);
    dispatch(setSearchedQuery(term));
    navigate(`/findJob?keyword=${encodeURIComponent(term)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full opacity-20 -translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 rounded-full opacity-20 translate-x-48 translate-y-48"></div>
      
      <div className="relative z-10 grid grid-cols-1 gap-12 items-center md:grid-cols-2 md:px-12 px-6 py-16 min-h-screen">
        {/* Left Section */}
        <div className="flex flex-col justify-center space-y-8">
          {/* Stats Bar */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md">
              <FaUsers className="text-blue-500" />
              <span className="font-semibold">500K+</span>
              <span className="text-gray-600">Active Users</span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md">
              <FaStar className="text-yellow-500" />
              <span className="font-semibold">4.8/5</span>
              <span className="text-gray-600">Rating</span>
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight md:text-6xl text-gray-800">
              Find Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Dream Job
              </span>{" "}
              Today
            </h1>
            <div className="flex items-center space-x-2 text-lg md:text-xl text-gray-600">
              <span>Over</span>
              <span className="font-bold text-blue-600 text-2xl md:text-3xl">
             93178
              </span>
              <span>opportunities waiting for you!</span>
              {/* <FaTrendingUp className="text-green-500 ml-2" /> */}
            </div>
            <p className="text-lg text-gray-600 max-w-lg">
              Connect with top companies, discover exciting opportunities, and take the next step in your career journey.
            </p>
          </div>

          {/* Enhanced Search Bar */}
          <div className={`bg-white p-2 rounded-2xl shadow-xl border-2 transition-all duration-300 ${
            isSearchFocused ? 'border-blue-500 shadow-2xl' : 'border-gray-200'
          }`}>
            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
              {/* Job Search Input */}
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="h-14 rounded-xl text-gray-800 w-full outline-none pl-12 pr-4 bg-gray-50 focus:bg-white transition-colors"
                  placeholder="Job title, skills, or company..."
                />
              </div>
              
              {/* Location Input */}
              <div className="flex-1 relative">
                <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="h-14 rounded-xl text-gray-800 w-full outline-none pl-12 pr-4 bg-gray-50 focus:bg-white transition-colors"
                  placeholder="City, state, or remote..."
                />
              </div>
              
              {/* Search Button */}
              <button
                onClick={handleSearch}
                disabled={!searchInput.trim()}
                className={`h-14 rounded-xl text-lg font-semibold px-8 transition-all duration-300 ${
                  searchInput.trim()
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg transform hover:-translate-y-1'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Search Jobs
              </button>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="space-y-3">
            <p className="text-gray-700 font-semibold">🔥 Trending Searches:</p>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term, index) => (
                <button
                  key={index}
                  onClick={() => handlePopularSearch(term)}
                  className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 hover:shadow-md"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">15K+</div>
              <div className="text-sm text-gray-600">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">2.5M+</div>
              <div className="text-sm text-gray-600">Job Seekers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">89%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Right Section (Enhanced Illustration with Floating Cards) */}
        <div className="flex justify-center md:justify-end relative h-96 md:h-auto">
          {/* Main Illustration Container */}
          <div className="relative">
            {/* Floating Action Cards with Staggered Animations */}
            <div className="absolute -left-6 top-8 md:-left-12 md:top-12 z-20">
              <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-float-1 border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FaRegHandshake className="text-blue-600 text-lg" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Upload CV</p>
                    <p className="text-xs text-gray-600">Get noticed faster</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -right-6 top-1/4 md:-right-12 md:top-1/3 z-20">
              <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-float-2 border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <FaUserTie className="text-green-600 text-lg" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Dream Job</p>
                    <p className="text-xs text-gray-600">Waiting for you!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -left-4 bottom-12 md:-left-8 md:bottom-16 z-20">
              <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-float-3 border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <FaBriefcase className="text-purple-600 text-lg" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Start Journey</p>
                    <p className="text-xs text-gray-600">Apply now!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Illustration */}
            <div className="relative bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl p-8 shadow-lg">
              <img
                src="https://res.cloudinary.com/df3pscsym/image/upload/v1741777753/uvdwymzbcofjgk35spun.png"
                alt="Job Search Illustration"
                className="h-auto max-w-full md:max-w-[400px] object-contain filter drop-shadow-lg"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='200' y='150' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='16'%3EJob Search Illustration%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-indigo-500 rounded-full opacity-30 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};