import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAllAdminJobs } from '../redux/jobSlice'

const useGetAllAdminJobs = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get( backendUrl + `/api/v1/job/get`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllAdminJobs();
  }, [])
}

export default useGetAllAdminJobs