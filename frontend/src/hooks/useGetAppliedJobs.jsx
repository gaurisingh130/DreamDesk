import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllAppliedJobs } from "../redux/jobSlice";

const useGetAppliedJobs = ()=>{
    const dispatch = useDispatch();
    const backendUrl = import.meta.env.VITE_APPLICATION_API_END_POINT;
    useEffect(()=>{
        const fetchAppliedJobs = async ()=>{
            try{
                const res = await axios.get(backendUrl + `/get` , {withCredentials : true});
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            } catch(error){
                console.log(error);
            }
        }
        fetchAppliedJobs();
    } , [])
}

export default useGetAppliedJobs;