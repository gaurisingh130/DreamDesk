import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job); 

    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'>
                <span className='text-[#6a38c2]'>Latest & Top </span>Job Openings
            </h1>
            <motion.div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
                <AnimatePresence>
                    {allJobs.length <= 0 ? (
                        <span className='text-gray-500'>No Job Available</span>
                    ) : (
                        allJobs?.slice(0, 6).map((job) => (
                            <motion.div
                                key={job._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.4 }}
                            >
                                <LatestJobCards job={job} />
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

export default LatestJobs;
