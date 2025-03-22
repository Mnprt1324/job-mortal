  import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaInfinity } from "react-icons/fa";
import { updatePassApiCall } from "../API/api";
import { useNavigate } from "react-router-dom";

export const UpdatePass = () => {
  const [isPass, setIsPass] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [email ,setEmail]=useState("");

  const navigate =useNavigate();
    useEffect(() => {
      const savedEmail = localStorage.getItem("email"); 
      if (savedEmail) setEmail(savedEmail);
      else navigate("/forgot");
    }, []);
  

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Both fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const data={password,email}
    const response = await updatePassApiCall(data);
    if(response.data.success){
      localStorage.removeItem("email");
       navigate("/");
    } 
    console.log("Password Updated:", password);
    setError("");
  };

  return (
    <section className="w-[100%] flex justify-center items-center my-20">
      <form className="py-6 px-7" onSubmit={handleSubmit}>
        <div className="flex mb-10">
          <FaInfinity className="text-blue-500 text-xl cursor-pointer mt-1" />
          <p className="font-bold ml-1 text-xl">ZipJob</p>
        </div>

        <h1 className="text-xl font-medium">Update Password</h1>
        <p className="text-slate-400 text-[14px] mb-3">
          Update your password easily.
        </p>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="flex flex-col relative">
          <label>
            Enter Password <span className="text-red-500">*</span>
          </label>
          <input
            type={isPass ? "password" : "text"}
            placeholder="Enter new password"
            className="h-10 w-[380px] px-3.5 mb-4 bg-slate-100 focus:outline-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            type={isPass ? "password" : "text"}
            placeholder="Re-enter new password"
            className="h-10 w-[380px] px-3.5 mb-4 bg-slate-100 focus:outline-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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

        <button
          type="submit"
          className={`w-[100%] p-2 text-slate-50 cursor-pointer mt-6 select-none ${
            password && confirmPassword
              ? "bg-blue-600 hover:bg-blue-500"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!password || !confirmPassword}
        >
          Update Password
        </button>
      </form>
    </section>
  );
};
