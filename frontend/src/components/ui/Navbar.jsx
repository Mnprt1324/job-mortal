import { FaInfinity } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUserApiCall } from "../../API/api";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/authSlice";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { HiMiniXMark } from "react-icons/hi2";

export const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenBoxClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await logoutUserApiCall();
      if (response.data.success) {
        Cookies.remove("token");
        dispatch(logoutUser());
        toast.success(response.data.message);
        setIsOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleProfile = () => {
    navigate("/profile");
    setIsOpen(false);
  };

  return (
    <nav className="flex justify-center md:items-center h-[75px] md:relative z-50">
      {/* Main Navbar Container */}
      <div className="border-b-2 border-blue-500 w-[100%] md:w-[50%] h-[50px] flex md:justify-center items-center md:border-1 md:border-blue-500 bg-white shadow-md md:rounded-3xl fixed">
        
        {/* Hamburger for Mobile */}
        <div className="pl-2 md:hidden" onClick={handleOpenBoxClick}>
          {isOpen ? (
            <HiMiniXMark className="text-3xl cursor-pointer" />
          ) : (
            <RxHamburgerMenu className="text-3xl cursor-pointer" />
          )}
        </div>

        {/* Logo */}
        <div className="flex gap-2 md:pl-4">
          <FaInfinity className="text-blue-500 text-2xl cursor-pointer hover:rotate-180" />
          <span className="font-medium md:hidden">ZipJob</span>
        </div>

        {/* Desktop Menu */}
        <div className="w-full hidden md:block">
          <ul className="w-full flex justify-around items-center pl-1">
            {user?.role === "recruiter" ? (
              <>
                <li><NavLink to="/companies">Companies</NavLink></li>
                <li><NavLink to="/jobs">Jobs</NavLink></li>
              </>
            ) : (
              <>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/findJob">Find Job</NavLink></li>
                <li><NavLink to="/about">About Us</NavLink></li>
                <li><NavLink to="/contact">Contact Us</NavLink></li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Desktop Auth Buttons */}
      <div className="hidden md:flex w-auto h-[50px] bg-white px-8 rounded-3xl absolute right-10 md:border-1 md:border-blue-500 justify-center items-center shadow-md">
        <ul className="flex text-blue-600 font-medium ">
          {isAuthenticated ? (
            <>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-blue-600 cursor-pointer hover:bg-blue-500 hover:p-2 hover:text-white rounded-2xl px-2"
                >
                  Logout
                </button>
              </li>
              <li>
                <button
                  onClick={handleProfile}
                  className="text-blue-600 cursor-pointer hover:bg-blue-500 hover:p-2 hover:text-white ml-2.5 rounded-2xl px-2"
                >
                  Profile
                </button>
              </li>
            </>
          ) : (
            <>
              <li><NavLink to="/register">Register</NavLink></li>
              <li><NavLink to="/login">Login</NavLink></li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Menu (Dropdown Style Centered Box) */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full h-[400px] bg-white grid place-items-center z-40 md:hidden shadow-lg">
          <ul className="flex flex-col gap-4 text-lg font-medium">
            {user?.role === "recruiter" ? (
              <>
                <li><NavLink to="/companies" onClick={() => setIsOpen(false)}>Companies</NavLink></li>
                <li><NavLink to="/jobs" onClick={() => setIsOpen(false)}>Jobs</NavLink></li>
              </>
            ) : (
              <>
                <li><NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink></li>
                <li><NavLink to="/findJob" onClick={() => setIsOpen(false)}>Find Job</NavLink></li>
                <li><NavLink to="/about" onClick={() => setIsOpen(false)}>About Us</NavLink></li>
                <li><NavLink to="/contact" onClick={() => setIsOpen(false)}>Contact Us</NavLink></li>
              </>
            )}
            {isAuthenticated ? (
              <>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Logout
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleProfile}
                    className="w-full text-left px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Profile
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><NavLink to="/register" onClick={() => setIsOpen(false)}>Register</NavLink></li>
                <li><NavLink to="/login" onClick={() => setIsOpen(false)}>Login</NavLink></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};
