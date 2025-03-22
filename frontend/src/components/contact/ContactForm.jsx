import { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { contactUsApiCall } from "../../API/api";
import Spinner from "../ui/Spinner";

export const ContactForm = () => {
  const { user } = useSelector((store) => store.auth);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false); // 🔹 Loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // 🔹 Start loading
    try {
      const response = await contactUsApiCall(formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({
          name: user?.name || "",
          email: user?.email || "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(response.message || "Failed to send message.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false); // 🔹 Stop loading
    }
  };

  return (
    <section className="flex flex-col justify-center w-full items-center md:flex-row md:gap-10 my-10 px-4">
      {/* Contact Info Box */}
      <div className="flex flex-col border-1 border-blue-500 h-auto justify-between p-6 rounded-lg shadow-lg w-full md:h-[30rem] md:w-[300px]">
        <div className="text-center">
          <FaMapMarkerAlt className="text-2xl text-blue-500 mb-2 mx-auto" />
          <h2 className="text-xl font-semibold">Location</h2>
          <p className="text-gray-700 mt-2">
            329 Queensberry Street, North Melbourne VIC 3051, Australia.
          </p>
        </div>
        <div className="text-center">
          <FaPhoneAlt className="text-2xl text-blue-500 mb-2 mx-auto" />
          <h2 className="text-xl font-semibold">Phone No</h2>
          <p className="text-gray-700 mt-2">123-456-7890</p>
        </div>
        <div className="text-center">
          <FaEnvelope className="text-2xl text-blue-500 mb-2 mx-auto" />
          <h2 className="text-xl font-semibold">Email</h2>
          <p className="text-gray-700 mt-2">zipJobcustomer1345@gmail.com</p>
        </div>
      </div>

      {/* Contact Form */}
      <form
        className="bg-white md:border md:border-blue-500 rounded-lg shadow-lg w-full md:w-[40rem] px-7 py-6"
        onSubmit={handleSubmit}
      >
        <div className="flex mb-6">
          <FaEnvelope className="text-blue-500 text-xl mt-1" />
          <p className="text-xl font-bold ml-2">Contact Us</p>
        </div>

        <h1 className="text-xl font-medium">Get in Touch</h1>
        <p className="text-slate-400 text-sm mb-4">
          Fill out the form below and we'll get back to you soon.
        </p>

        {/* Name */}
        <div className="flex flex-col">
          <label>
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="bg-slate-100 h-10 w-full focus:outline-blue-500 mb-4 px-3.5"
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label>
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="bg-slate-100 h-10 w-full focus:outline-blue-500 mb-4 px-3.5"
            required
          />
        </div>

        {/* Subject */}
        <div className="flex flex-col">
          <label>
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter subject"
            className="bg-slate-100 h-10 w-full focus:outline-blue-500 mb-4 px-3.5"
            required
          />
        </div>

        {/* Message */}
        <div className="flex flex-col">
          <label>
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
            className="bg-slate-100 h-24 w-full focus:outline-blue-500 mb-4 px-3.5"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex bg-blue-600 justify-center p-2 text-white w-full cursor-pointer hover:bg-blue-500 items-center mt-4"
          disabled={loading} // 🔹 Disable button while loading
        >
          {loading ? <Spinner /> : "Send Message"}
        </button>
      </form>
    </section>
  );
};
