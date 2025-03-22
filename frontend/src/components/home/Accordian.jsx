import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export const Accordian = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-blue-500 p-4 rounded-lg shadow-md duration-300 max-w-[500px] min-w-[300px] mx-auto transition-all">
      {/* Header Section */}
      <div
        className="flex justify-between p-2 rounded cursor-pointer duration-300 items-center transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Animated Question Text */}
        <p
          className={` text-lg font-semibold transition-all duration-300 ${
            isOpen ? "text-blue-600 scale-105" : "text-gray-900"
          }`}
        >
          {title}
        </p>

        {/* Arrow with Rotation Animation */}
        <FaChevronDown
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180 text-blue-600" : "rotate-0 text-gray-900"
          }`}
        />
      </div>

      {/* Smooth Expand/Collapse with Slide-in Effect */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-40 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"
        }`}
      >
        <p className="text-gray-700 mt-2">{content}</p>
      </div>
    </div>
  );
};
