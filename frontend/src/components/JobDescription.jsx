import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '../redux/jobSlice';
import axios from 'axios';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const JobDescription = () => {
  const backendUrl = import.meta.env.VITE_APPLICATION_API_END_POINT;
  const backendUrl1 = import.meta.env.VITE_JOB_API_END_POINT;
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const { singleJob } = useSelector(state => state.job);
  const { user } = useSelector(store => store.auth);

  const isinitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
  const [isApplied, setisApplied] = useState(isinitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(backendUrl + `/apply/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        setisApplied(true);
        const updateSingleJob  = {...singleJob , applications : [...singleJob.applications , {applicant:user?._id}]};
        dispatch(setSingleJob(updateSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(backendUrl1 + `/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setisApplied(res.data.job.applications.some(application=>application.applicant===user?._id))
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchSingleJob();
  }, [jobId, dispatch, user?._id])

  return (
    <motion.div 
      className='max-w-7xl mx-auto my-10'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className='flex items-center justify-between mb-6'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div>
          <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
          <div className='flex items-center gap-2 mt-4'>
            <Badge className='text-blue-700 font-bold' variant="ghost">{singleJob?.position}</Badge>
            <Badge className='text-[#f83002] font-bold' variant="ghost">{singleJob?.jobType}</Badge>
            <Badge className='text-[#7209b7] font-bold' variant="ghost">{singleJob?.salary}LPA</Badge>
          </div>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}
          >
            {isApplied ? 'Already Applied' : 'Apply Now'}
          </Button>
        </motion.div>
      </motion.div>

      <motion.h1 
        className='border-b-2 border-b-gray-300 font-medium py-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {singleJob?.description}
      </motion.h1>

      <motion.div 
        className='my-4 space-y-2'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h1 className='font-bold'>Role : <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
        <h1 className='font-bold'>Location : <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
        <h1 className='font-bold'>Description : <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
        <h1 className='font-bold'>Experience : <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} yrs</span></h1>
        <h1 className='font-bold'>Salary : <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}LPA</span></h1>
        <h1 className='font-bold'>Total Applicants : <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
        <h1 className='font-bold'>Posted Date : <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0]}</span></h1>
      </motion.div>
    </motion.div>
  )
}

export default JobDescription
