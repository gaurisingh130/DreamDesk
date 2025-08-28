import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { AvatarImage, Avatar } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDiff = Math.abs(currentTime - createdAt);   
        return Math.floor(timeDiff / (1000 * 24 * 60 * 60));
    }

    return (
        <motion.div
            className='p-5 rounded-lg shadow-xl bg-white border-gray-100'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Button variant='outline' className='rounded-full' size='icon'> 
                        <Bookmark /> 
                    </Button>
                </motion.div>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className='p-6' variant='outline' size='icon'>
                        <Avatar>
                            <AvatarImage src={job?.company?.logo} />
                        </Avatar>
                    </Button>
                </motion.div>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>

            <div className='flex items-center gap-2 mt-4'>
                <Badge className='text-blue-700 font-bold' variant="ghost">{job?.position}</Badge>
                <Badge className='text-[#f83002] font-bold' variant="ghost">{job?.jobtype}</Badge>
                <Badge className='text-[#7209b7] font-bold' variant="ghost">{job?.salary}</Badge>
            </div>

            <div className='flex items-center gap-4 mt-4'>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button onClick={() => navigate(`/description/${job?._id}`)} variant='outline'>Details</Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button className='bg-[#7209b7]'>Save For Later</Button>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Job
