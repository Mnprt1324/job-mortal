import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllJobAppByUser } from "../API/api";
import { setAllAppliedJobs } from "../redux/jobSlice";


const useGetAppliedJobs  = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAppliedJobs  = async () => {
      try {
        const response = await getAllJobAppByUser() ;
        if (response.data.success) {
          dispatch(setAllAppliedJobs(response.data.application));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppliedJobs();
  },[]);
};

export default useGetAppliedJobs;