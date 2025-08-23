import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {getAplliedJobsByUser } from "../API/api";
import { setAppliedJob } from "../redux/applicationSlice";


const useGetAllAppliedJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAppliedJobs  = async () => {
      try {
        const response = await getAplliedJobsByUser() ;
        console.log("aaaa",response);
        if (response.data.success) {
          dispatch(setAppliedJob(response.data.application));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAppliedJobs ();
  },[]);
};

export default useGetAllAppliedJobs;