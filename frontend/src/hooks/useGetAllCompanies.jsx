import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {setCompanies} from '../redux/companySlice.js'

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  const backendUrl = import.meta.env.VITE_COMPANY_API_END_POINT;
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get( backendUrl + `/get`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchCompanies();
  },[]);
}

export default useGetAllCompanies