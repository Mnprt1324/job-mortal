import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchOldNewJobs} from "../API/api";
import { setSotedJobs } from "../redux/jobSlice";
const useSortJobs = (sortby,limit) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCompany  = async () => {
      try {
        const response = await fetchOldNewJobs(sortby,limit);
        if (response.data.success) {
          dispatch(setSotedJobs(response.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleCompany ();
  },[]);
};

export default useSortJobs;








 