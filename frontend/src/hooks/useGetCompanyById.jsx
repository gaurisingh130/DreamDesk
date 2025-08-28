import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {setSingleCompany} from '../redux/companySlice.js'

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();
  const backendUrl = import.meta.env.VITE_COMPANY_API_END_POINT;
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(backendUrl + `/get/${companyId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchSingleCompany();
  }, [companyId , dispatch])
}

export default useGetCompanyById