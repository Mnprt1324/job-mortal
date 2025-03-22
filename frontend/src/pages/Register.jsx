import { useState } from "react";
import { FaInfinity, FaEye, FaEyeSlash } from "react-icons/fa";
import { registerUserApiCall } from "../API/api";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const [isPass, setIsPass] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "jobseeker",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const response = await registerUserApiCall(formData);
    if (response.data.success === true) navigate("/login");
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "jobseeker",
    });
  };

  return (
    <section className="w-full flex justify-center items-center my-20 px-4">
      <form onSubmit={handleSubmit} className="py-6 px-7  select-none  w-[500px]">
        <div className="flex mb-10">
          <FaInfinity className="text-blue-500 text-xl cursor-pointer mt-1" />
          <p className="font-bold ml-1 text-xl">ZipJob</p>
        </div>

        <h1 className="text-xl font-medium">Register</h1>
        <p className="text-slate-400 text-[14px] mb-3">
          Access to all features. No credit card required.
        </p>

        <div className="flex flex-col">
          <label>
            Enter fullname <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter fullname"
            className="h-10 w-full px-3.5 mb-4 bg-slate-100 focus:outline-blue-500"
            required
          />
        </div>

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
            className="h-10 w-full px-3.5 mb-4 bg-slate-100 focus:outline-blue-500"
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
            className="h-10 w-full px-3.5 mb-4 bg-slate-100 focus:outline-blue-500"
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

        <div className="flex flex-col relative">
          <label>
            Re-enter Password <span className="text-red-500">*</span>
          </label>
          <input
            type={isPass ? "password" : "text"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            className="h-10 w-full px-3.5 mb-4 bg-slate-100 focus:outline-blue-500"
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

        <fieldset className="mb-4">
          <legend className="font-medium">Select User Type:</legend>
          <label className="cursor-pointer mr-4">
            <input
              type="radio"
              name="role"
              value="jobseeker"
              checked={formData.role === "jobseeker"}
              onChange={handleChange}
            />
            <span className="ml-2">Job seeker</span>
          </label>

          <label className="cursor-pointer">
            <input
              type="radio"
              name="role"
              value="recruiter"
              checked={formData.role === "recruiter"}
              onChange={handleChange}
            />
            <span className="ml-2">Recruiter</span>
          </label>
        </fieldset>

        <button
          type="submit"
          className="bg-blue-600 w-full p-2 text-slate-50 hover:bg-blue-500 cursor-pointer mt-6 select-none"
        >
          Register
        </button>
      </form>
    </section>
  );
};
