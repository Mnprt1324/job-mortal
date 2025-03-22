import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateCompanyProfileApi } from "../API/api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import useGetCompanyById from "../hooks/useGetCompanyById";
import Spinner from "../components/ui/Spinner";

export const UpdateCompanyProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  useGetCompanyById(id);
  const { singleCompany } = useSelector((store) => store.company);

  const [formData, setFormData] = useState({
    companyName: "",
    description: "",
    location: "",
    website: "",
    logo: null,
  });

  const [loading, setLoading] = useState(false); // Track loading state

  useEffect(() => {
    if (singleCompany) {
      setFormData({
        companyName: singleCompany.companyName || "",
        description: singleCompany.description || "",
        location: singleCompany.location || "",
        website: singleCompany.website || "",
        logo: null,
      });
    }
  }, [singleCompany]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, logo: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await updateCompanyProfileApi(formData, id);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <section className="h-screen flex justify-center">
      <div className="w-[50%] bg-white p-6 mt-4">
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline mb-4">
          &larr; Back
        </button>

        <h1 className="text-2xl font-semibold text-center mb-4">Update Company</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Company Name & Location (Same Row) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter company name"
                className="w-full p-2 border-none-rounded-lg bg-gray-100 focus:outline-blue-500"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter company location"
                className="w-full p-2 border-none bg-gray-100 focus:outline-blue-500"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter company description"
              className="w-full p-2 border-none  bg-gray-100 focus:outline-blue-500"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Website & Logo Upload (Same Row) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Website</label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="Enter company website"
                className="w-full p-2 border-none  bg-gray-100 focus:outline-blue-500"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Company Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border-none bg-gray-100 focus:outline-blue-500"
              />
            </div>
          </div>

          {/* Submit Button with Spinner */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 cursor-pointer flex items-center justify-center gap-2"
            disabled={loading} // Disable button while loading
          >
            {loading ? <Spinner /> : "Update"}
          </button>
        </form>
      </div>
    </section>
  );
};
