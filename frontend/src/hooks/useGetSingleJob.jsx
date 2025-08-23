import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSingleJob } from "../redux/jobSlice";
import { getSingleJobApiCall } from "../API/api";

const useGetSingleJob  = (id) => {
    const dispatch = useDispatch();
    useEffect(() => {
      const fetchAppliedJobs  = async () => {
        try {
          const response = await getSingleJobApiCall(id) ;
          console.log("ads",response);
          if (response.data.success) {
            dispatch(setSingleJob(response.data.job));
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchAppliedJobs();
    },[]);
  };
  export default useGetSingleJob;