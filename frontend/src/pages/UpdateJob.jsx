import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSingleJobApiCall,  updateJobApiCall } from "../API/api";

export const UpdateJob = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [singlejob, setSingleJob] = useState(null);
  const { companies } = useSelector((store) => store.company);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    requirement: "",
    description: "",
    jobType: "",
  });

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const response = await getSingleJobApiCall(id);
      setSingleJob(response.data.job);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  useEffect(() => {
    if (singlejob) {
      setFormData({
        title: singlejob.title || "",
        company: singlejob.company?._id || "",
        location: singlejob.location || "",
        salary: singlejob.salary || "",
        requirement: singlejob.requirement || "",
        description: singlejob.description || "",
        jobType: singlejob.jobType || "",
      });
    }
  }, [singlejob]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateJobApiCall(id,formData);
      console.log(response)
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="h-screen flex justify-center">
      <div className="w-[50%] bg-white p-6 mt-4">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline mb-4"
        >
          &larr; Back
        </button>

        <h1 className="text-2xl font-semibold text-center mb-4">
          Update a job
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter job title"
                className="w-full p-2 border-none bg-gray-100 focus:outline-blue-500"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Company</label>
              <select
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full p-2 border-none bg-gray-100 focus:outline-blue-500"
                required
              >
                <option value="">Select a company</option>
                {companies.map((company) => (
                  <option key={company._id} value={company._id}>
                    {company.companyName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter location"
                className="w-full p-2 border-none bg-gray-100 focus:outline-blue-500"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Salary</label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="Enter salary"
                className="w-full p-2 border-none bg-gray-100 focus:outline-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Job Type</label>
              <input
                type="text"
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                placeholder="Full-time / Part-time / Remote"
                className="w-full p-2 border-none bg-gray-100 focus:outline-blue-500"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Requirements</label>
              <input
                type="text"
                name="requirement"
                value={formData.requirement}
                onChange={handleChange}
                placeholder="Skills required (comma-separated)"
                className="w-full p-2 border-none bg-gray-100 focus:outline-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter job description"
              className="w-full p-2 border-none bg-gray-100 focus:outline-blue-500"
              rows="3"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Update Job
          </button>
        </form>
      </div>
    </section>
  );
};
