import { useState } from "react";
import { FaInfinity } from "react-icons/fa";
import { forgetPasswordApiCall } from "../API/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Styles
import { useDispatch, useSelector } from "react-redux";
import { setForgetAuth, setResetFlowStep,} from "../redux/authSlice";

export const Forget = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const {forgetAuth}=useSelector((store)=>store.auth)
  const navigate = useNavigate();
  const dispatch=useDispatch();
  dispatch(setForgetAuth(true));

  console.log(forgetAuth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email) {
      toast.error("Please enter your email.");
      setLoading(false);
      return;
    }

    try {
      const response = await forgetPasswordApiCall({ email });
      if (response.data.success) {
        toast.success("OTP sent successfully! Check your email.");
          dispatch(setResetFlowStep("verify"))  
        localStorage.setItem("email", email);
        navigate("/verify/password");
      } else {
        toast.error(response.data.message || "Failed to send OTP. Try again.");
      }
    } catch (err) {
      console.error("API Error:", err);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center w-[100%] items-center my-20">
      <form className="px-7 py-6" onSubmit={handleSubmit}>
        <div className="flex mb-10">
          <FaInfinity className="text-blue-500 text-xl cursor-pointer mt-1" />
          <p className="text-xl font-bold ml-1">ZipJob</p>
        </div>

        <h1 className="text-xl font-medium">Forgot Password</h1>
        <p className="text-[14px] text-slate-400 mb-3">
          Enter the email address associated with your account.
          <br /> We will send you a link to reset your password.
        </p>

        <div className="flex flex-col">
          <label>
            Enter Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="bg-slate-100 h-10 w-[380px] focus:outline-blue-500 mb-4 px-3.5"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-[100%] p-2 text-white cursor-pointer mt-4 select-none ${
            email && !loading
              ? "bg-blue-600 hover:bg-blue-500"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!email || loading}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>
    </section>
  );
};
