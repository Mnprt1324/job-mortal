import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllApplicantApiCall, UpdateStatusApiCall } from "../API/api";
import { useDispatch, useSelector } from "react-redux";
import { setApplication } from "../redux/applicationSlice";
import { HiDotsHorizontal } from "react-icons/hi";
import { MenuButton } from "../components/ui/MenuButton";

export const Applicants = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { applicants } = useSelector((store) => store.application);
  
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    const applicantFetch = async () => {
      try {
        const response = await getAllApplicantApiCall(id);
        if (response.data.success) {
          dispatch(setApplication(response.data.applicants));
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };

    if (id) {
      applicantFetch();
    }
  }, [id, dispatch]);

  const toggleMenu = (menuId) => {
    setActiveMenu(activeMenu === menuId ? null : menuId);
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await UpdateStatusApiCall(id, {status});
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleAccept = (id) => {
    updateStatus(id, "accepted");
  };

  const handleReject = (id) => {
    updateStatus(id, "rejected");
  };

  const menuOptions = [
    { menuName: "Accept", handler: handleAccept },
    { menuName: "Reject", handler: handleReject },
  ];

  return (
    <section className="flex justify-center items-center p-4">
      <div className="w-full md:w-3/4">
        <h2 className="text-lg md:text-xl font-semibold text-center my-4">
          Applicants List
        </h2>

        <div className="overflow-x-auto">
          {applicants?.length > 0 ? (
            <table className="mt-3 w-full border-collapse border border-gray-300 text-sm md:text-base">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300">
                  <th className="p-2">Full Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Contact</th>
                  <th className="p-2">Resume</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((curr) => (
                  <tr key={curr._id} className="text-center border-b">
                    <td className="p-2">{curr.applicant.name}</td>
                    <td className="p-2">{curr.applicant.email}</td>
                    <td className="p-2">{curr.applicant.profile.phone}</td>
                    <td className="p-2">
                      {curr.applicant.resume ? (
                        <a
                          href={curr.applicant.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          Download
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="p-2">
                      {new Date(curr.applicant.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-2 relative">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer"
                        onClick={() => toggleMenu(curr._id)}
                      >
                        <HiDotsHorizontal className="text-lg md:text-xl" />
                      </button>

                      <MenuButton  menu={activeMenu === curr._id} menuoption={menuOptions} id={curr._id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500">No applicants found.</p>
          )}
        </div>
      </div>
    </section>
  );
};
