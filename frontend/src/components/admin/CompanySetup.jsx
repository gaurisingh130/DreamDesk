import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '../../hooks/useGetCompanyById'
import Footer from '../Footer'

const CompanySetup = () => {
    const params = useParams()
    useGetCompanyById(params.id)

    const { singleCompany } = useSelector(store => store.company)

    const [input, setInput] = useState({
        name: '',
        description: '',
        website: '',
        location: '',
        file: null
    })

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0]
        setInput({ ...input, file })
    }
    const backendUrl = import.meta.env.VITE_COMPANY_API_END_POINT;
    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', input.name)
        formData.append('description', input.description)
        formData.append('website', input.website)
        formData.append('location', input.location)
        if (input.file) formData.append('file', input.file)

        try {
            setLoading(true)
            const res = await axios.put(backendUrl + `/update/${params.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/admin/companies')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || '',
            description: singleCompany.description || '',
            website: singleCompany.website || '',
            location: singleCompany.location || '',
            file: singleCompany.file || null
        })
    }, [singleCompany])

    return (
        <div>
            <Navbar />
            <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center gap-4 mb-6">
                    <Button
                        onClick={() => navigate('/admin/companies')}
                        variant="outline"
                        className="flex items-center gap-2 text-gray-500 font-semibold"
                    >
                        <ArrowLeft /> Back
                    </Button>
                    <h1 className="font-bold text-xl">Company Setup</h1>
                </div>

                <form onSubmit={submitHandler} className="grid grid-cols-2 gap-4">
                    <div>
                        <Label>Company Name</Label>
                        <Input
                            type="text"
                            name="name"
                            value={input.name}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Input
                            type="text"
                            name="description"
                            value={input.description}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div>
                        <Label>Website</Label>
                        <Input
                            type="text"
                            name="website"
                            value={input.website}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div>
                        <Label>Location</Label>
                        <Input
                            type="text"
                            name="location"
                            value={input.location}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div className="col-span-2">
                        <Label>Logo</Label>
                        <Input type="file" accept="image/*" onChange={changeFileHandler} />
                    </div>

                    <div className="col-span-2 mt-4">
                        {loading ? (
                            <Button className="w-full">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full">
                                Update
                            </Button>
                        )}
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    )
}

export default CompanySetup
