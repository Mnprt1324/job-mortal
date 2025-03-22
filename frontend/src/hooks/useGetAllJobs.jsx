import { useEffect, useState } from "react";
import { setAllJobs } from "../redux/jobSlice";
import { getAllJobs } from "../API/api";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = ({ keyword = "", sortBy = "new", page = 1, limit = 10 }) => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchAllJobs = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getAllJobs({ 
          keyword: searchedQuery === "All" ? "" : searchedQuery, 
          sortBy, 
          page, 
          limit 
        });

        if (response.data.success) {
          dispatch(setAllJobs(response.data.jobs));
          setTotalPages(response.data.totalPages);
        } else {
          setError("No jobs found");
        }
      } catch (error) {
        setError("Error fetching jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchAllJobs();
  }, [searchedQuery, sortBy, page, limit, dispatch]); // Dependencies ensure re-fetching on change

  return { loading, error, totalPages };
};

export default useGetAllJobs;
