import { useState } from "react";
import { FaEye, FaEyeSlash, FaInfinity } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { loginUserApiCall } from "../API/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setAuthenticate, setUser } from "../redux/authSlice";

export const Login = () => {
  const [isPass, setIsPass] = useState(true);
  const dispatch=useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "jobseeker",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.role) {
      alert("Please select a user type.");
      return;
    }

    console.log("Login Data:", formData);
    // api call
    try {
      const response = await loginUserApiCall(formData);
      if (response.data.success) {
        const role=response.data.user.role;
        toast.success(response.data.message);
        role==="recruiter"? navigate("/companies"):navigate("/");
        dispatch(setAuthenticate());
        dispatch(setUser(response.data.user))
      }
      setFormData({
        email: "",
        password: "",
        role: "jobseeker",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
     
    }
  };

  return (
    <section className="w-[100%] flex md:justify-center md:items-center md:my-20">
      <form className="py-6 px-7" onSubmit={handleSubmit}>
        <div className="flex mb-10">
          <FaInfinity className="text-blue-500 text-xl cursor-pointer mt-1" />
          <p className="font-bold ml-1 text-xl">ZipJob</p>
        </div>

        <h1 className="text-xl font-medium">Log In</h1>
        <p className="text-slate-400 text-[14px] mb-3">
          Please login to continue to your account
        </p>

        <div className="flex flex-col">
          <label>
            Enter email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="h-10 w-[380px] px-3.5 mb-4 bg-slate-100 focus:outline-blue-500"
            required
          />
        </div>

        <div className="flex flex-col relative">
          <label>
            Enter Password <span className="text-red-500">*</span>
          </label>
          <input
            type={isPass ? "password" : "text"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="h-10 w-[380px] px-3.5 mb-4 bg-slate-100 focus:outline-blue-500"
            required
          />
          <div
            className="absolute top-8 right-2 cursor-pointer"
            onClick={() => setIsPass(!isPass)}
          >
            {isPass ? (
              <FaEye className="text-blue-600 text-[20px]" />
            ) : (
              <FaEyeSlash className="text-blue-600 text-[20px]" />
            )}
          </div>
        </div>

        <span
          className="text-blue-500 text-sm cursor-pointer block text-right mt-[-10px] mb-4"
          onClick={() => navigate("/forget")}
        >
          Forgot Password?
        </span>

        <div className="flex flex-col mb-4">
          <div className="flex">
            <label className="cursor-pointer">
              <input
                type="radio"
                name="role"
                value="jobseeker"
                checked={formData.role === "jobseeker"}
                onChange={handleChange}
                className="mr-2"
              />
              Job Seeker
            </label>

            <label className="cursor-pointer ml-4">
              <input
                type="radio"
                name="role"
                value="recruiter"
                checked={formData.role === "recruiter"}
                onChange={handleChange}
                className="mr-2"
              />
              Recruiter
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 w-[100%] p-2 text-slate-50 hover:bg-blue-500 cursor-pointer mt-6 select-none"
        >
          Log In
        </button>
      </form>
    </section>
  );
};
