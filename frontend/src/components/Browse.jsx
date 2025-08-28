import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import useGetAllJobs from '../hooks/useGetAllJobs';
import { motion } from 'framer-motion';
import Footer from './Footer';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [])

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'> Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    {allJobs.map((job) => (
                        <motion.div
                            key={job._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="rounded-lg shadow-md"
                        >
                            <Job job={job} />
                        </motion.div>
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Browse;
