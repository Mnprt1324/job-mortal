import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../API/api";
import { setUser } from "../redux/authSlice";
import Spinner from "./ui/Spinner";

export const ProfileUpdate = ({ setShowModal }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // Start with false

  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.profile?.phone || "",
    location: user.profile?.location || "",
    bio: user.profile?.bio || "",
    skills: user.profile?.skills.join(", ") || "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("bio", formData.bio);
      formDataToSend.append("skills", formData.skills); // Send as a string

      if (selectedImage) {
        formDataToSend.append("profileImage", selectedImage);
      }

      const response = await updateUserProfile(formDataToSend);
      console.log(response.data);
      dispatch(setUser(response.data.user));

      setShowModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen absolute w-full bg-blend-soft-light h-full">
      <form
        onSubmit={handleSubmit}
        className="w-[500px] bg-white p-6 rounded-xl shadow-md"
        encType="multipart/form-data"
      >
        <div className="relative">
          <h1 className="text-2xl font-medium mb-4 text-center">Update Profile</h1>
          <button
            onClick={() => setShowModal(false)}
            className="absolute right-0 top-2 bg-blue-600 text-white w-8 h-8 text-center"
            type="button"
          >
            X
          </button>
        </div>

        {/* Name and Email */}
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label>Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="h-10 w-full px-3.5 bg-slate-100 focus:outline-blue-500"
              required
            />
          </div>
          <div className="w-1/2">
            <label>Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="h-10 w-full px-3.5 bg-slate-100 focus:outline-blue-500"
              required
            />
          </div>
        </div>

        {/* Phone Number and Location */}
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label>Phone Number <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="h-10 w-full px-3.5 bg-slate-100 focus:outline-blue-500"
              required
            />
          </div>
          <div className="w-1/2">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="h-10 w-full px-3.5 bg-slate-100 focus:outline-blue-500"
            />
          </div>
        </div>

        {/* Bio and Skills */}
        <div className="mb-4">
          <label>Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="h-20 w-full px-3.5 py-2 bg-slate-100 focus:outline-blue-500"
          />
        </div>
        <div className="mb-4">
          <label>Skills</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="h-10 w-full px-3.5 bg-slate-100 focus:outline-blue-500"
          />
          <small className="text-slate-500">Example: React, Node.js, MongoDB</small>
        </div>

        {/* Profile Picture Upload */}
        <div className="mb-4">
          <label>Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3.5 bg-slate-100 focus:outline-blue-500"
          />
        </div>

        {/* Submit Button with Loading Spinner */}
        <button
          className="bg-blue-600 w-full p-2 text-white hover:bg-blue-500 cursor-pointer mt-4 flex justify-center items-center"
          disabled={loading}
        >
          {loading ? <Spinner /> : "Update Profile"}
        </button>
      </form>
    </div>
  );
};
