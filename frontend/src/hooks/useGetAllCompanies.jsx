import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {setCompanies} from "../redux/companySlice"
import { getAllRecurCompanied } from "../API/api";

export const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await getAllRecurCompanied();
        if (response.data.success) {
          dispatch(setCompanies(response.data.companies));
        }
      } catch (error) {
        console.log(error.message);
      }
    };
fetchCompanies();
  },[]);
};


