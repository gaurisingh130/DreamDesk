import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Mail, Pen, Contact } from 'lucide-react'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '../hooks/useGetAppliedJobs'
import { motion } from 'framer-motion'
import Footer from './Footer'

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open , setOpen] = useState(false);
    const {user} = useSelector(store =>store.auth);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Navbar />
            <motion.div 
                className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow-lg'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className='h-24 w-24'>
                            <AvatarImage src={user?.profile?.profilePhoto} alt='profile' />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className='text-right' variant='outline'>
                        <Pen />
                    </Button>
                </div>

                <div className='my-5 space-y-2'>
                    <div className='flex items-center gap-3'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>

                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1 flex-wrap'>
                        {user?.profile?.skills.length !== 0 
                            ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) 
                            : <span>NA</span>}
                    </div>
                </div>

                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className='text-medium font-bold'>Resume</Label>
                    {isResume 
                        ? <a target='_blank' rel="noreferrer" href={`https://docs.google.com/gview?url=${encodeURIComponent(user?.profile?.resume)}&embedded=true`} className='text-blue-500 hover:underline cursor-pointer'>
                            {user?.profile?.resumeOriginalName}
                          </a>
                        : <span>NA</span>}
                </div>
            </motion.div>

            <motion.div 
                className='max-w-4xl mx-auto bg-white rounded-2xl shadow-lg mt-6 p-5'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedJobTable />
            </motion.div>

            <UpdateProfileDialog open={open} setOpen={setOpen}/>
            <Footer/>
        </motion.div>
    )
}

export default Profile
