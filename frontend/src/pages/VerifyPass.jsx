import { useState, useRef, useEffect } from "react";
import { FaInfinity } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { verifyOtpApiCall } from "../API/api";
import { useDispatch } from "react-redux";
import { setResetFlowStep } from "../redux/authSlice";

export const VerifyPass = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email ,setEmail]=useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();
 const dispatch =useDispatch();

  useEffect(() => {
    const savedEmail = localStorage.getItem("email"); 
    if (savedEmail) setEmail(savedEmail);
    else navigate("/forgot");
  }, []);


  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      alert("Please enter the complete OTP.");
      return;
    }
    console.log("OTP Entered:", otpValue);
    // API call for OTP verification
    const response = await verifyOtpApiCall({otp:otpValue,email});
    if (response.data.success) {
       dispatch(setResetFlowStep("update"))  
      navigate("/update/password");
    }
    setOtp(["", "", "", "", "", ""]);
  };

  return (
    <section className="flex justify-center w-[100%] items-center my-20">
      <form className="px-7 py-6" onSubmit={handleSubmit}>
        <div className="flex mb-10">
          <FaInfinity className="text-blue-500 text-xl cursor-pointer mt-1" />
          <p className="text-xl font-bold ml-1">ZipJob</p>
        </div>

        <h1 className="text-xl font-medium">Verify OTP</h1>
        <p className="text-[14px] text-slate-400 mb-3">Enter the OTP sent to your email</p>

        <div className="flex justify-center gap-2 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength={1}
              className="border border-gray-300 h-12 rounded-md text-center text-lg w-12 focus:outline-blue-500"
            />
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-600 p-2 text-slate-50 w-[100%] cursor-pointer hover:bg-blue-500 mt-6 select-none"
        >
          Verify OTP
        </button>
      </form>
    </section>
  );
};
