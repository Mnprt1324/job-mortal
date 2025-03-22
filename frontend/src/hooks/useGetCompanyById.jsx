import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../redux/companySlice"
import { getIndCompanyById } from "../API/api";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCompany  = async () => {
      try {
        const response = await getIndCompanyById(companyId);
        if (response.data.success) {
          dispatch(setSingleCompany(response.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleCompany ();
  },[]);
};

export default useGetCompanyById;








 