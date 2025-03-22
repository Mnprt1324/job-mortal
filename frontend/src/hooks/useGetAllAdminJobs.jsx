import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetAllJobsCrtByRec } from "../API/api";
import { setAllAdminJobs } from "../redux/jobSlice";

const useGetAllAdminJobs  = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminJobs  = async () => {
      try {
        const response = await GetAllJobsCrtByRec() ;
        if (response.data.success) {
          dispatch(setAllAdminJobs(response.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAdminJobs ();
  },[]);
};

export default useGetAllAdminJobs;