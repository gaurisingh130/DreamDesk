import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchJobByText } from '../../redux/jobSlice'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs'
import Footer from '../Footer'

const AdminJobs = () => {
    useGetAllAdminJobs();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Update search filter in Redux whenever input changes
    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input, dispatch]);

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex flex-col sm:flex-row items-center justify-between gap-4 my-5'>
                    <Input
                        className='w-full sm:w-1/2'
                        placeholder="Filter by name, role"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={() => navigate('/admin/jobs/create')} className='sm:w-auto w-full'>
                        New Jobs
                    </Button>
                </div>
                <AdminJobsTable />
            </div>
            <Footer/>
        </div>
    )
}

export default AdminJobs
