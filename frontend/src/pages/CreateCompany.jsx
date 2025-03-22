import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCompanyApiCall } from "../API/api";
import { toast } from "react-toastify";

export const CreateCompany = () => {
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handleSubmit =  async(e) => {
   try {
    e.preventDefault();
    const response=await createCompanyApiCall({companyName});
    console.log(response.data);
    if(response.data.success){
        toast.success(response?.data?.message);
        navigate(`/companies/update/profile/${response.data.company._id}`)
    }
    console.log(response.data)
    console.log("Company Name:", companyName);
   } catch (error) {
    console.log(error)
      toast.error(error.response?.data?.message||"something went worng");
   }
  };

  return (
    <section className="h-screen flex justify-center">
      <div className="w-[75%] p-6 bg-white  rounded-lg">
        <div className="mb-6">
          <h1 className="font-medium text-3xl">Your Company Name</h1>
          <p className="text-gray-600">
            What would you like to name your company? You can change this later.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-6">
            <label className="font-medium">
              Company Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="companyName"
              value={companyName}
              onChange={handleChange}
              placeholder="Enter your company name"
              className="h-10 px-3.5 mt-1 bg-slate-100 focus:outline-blue-500 rounded-md"
              required
            />
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
