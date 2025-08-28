import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import Footer from '../Footer'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: "",
        companyId: ""
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { companies } = useSelector(store => store.company)

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value)
        setInput({ ...input, companyId: selectedCompany._id })
    }
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post( backendUrl + `/api/v1/job/post`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/admin/jobs')
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md bg-white'>
                    <div className='grid grid-cols-2 gap-4'>
                        {[
                            { label: "Title", name: "title", type: "text" },
                            { label: "Description", name: "description", type: "text" },
                            { label: "Requirements", name: "requirements", type: "text" },
                            { label: "Salary", name: "salary", type: "text" },
                            { label: "Location", name: "location", type: "text" },
                            { label: "Job Type", name: "jobType", type: "text" },
                            { label: "Experience Level", name: "experience", type: "text" },
                            { label: "No of Positions", name: "position", type: "number" }
                        ].map((field) => (
                            <div key={field.name}>
                                <Label>{field.label}</Label>
                                <Input
                                    type={field.type}
                                    name={field.name}
                                    value={input[field.name]}
                                    onChange={changeEventHandler}
                                    className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                                />
                            </div>
                        ))}

                        {companies.length > 0 && (
                            <div className='col-span-2'>
                                <Label>Company</Label>
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className='w-full'>
                                        <SelectValue placeholder='Select a Company' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem key={company._id} value={company.name.toLowerCase()}>
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>

                    <div className='mt-4'>
                        {loading ? (
                            <Button className="w-full">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full">
                                Post New Job
                            </Button>
                        )}
                        {companies.length === 0 && (
                            <p className='text-xs text-red-600 font-bold text-center mt-3'>
                                *Please register a company first before posting a job
                            </p>
                        )}
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    )
}

export default PostJob
