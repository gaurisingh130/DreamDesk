import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setSingleCompany } from '../../redux/companySlice'
import Footer from '../Footer'

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const CompanyCreate = () => {
    const navigate = useNavigate()
    const [companyName, setCompanyName] = useState('')
    const dispatch = useDispatch()

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(backendUrl + 
                `/api/v1/company/register`,
                { companyName },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message)
                const companyId = res?.data?.company?._id
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || 'Something went wrong')
        }
    }

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto my-10 p-4 bg-white rounded-lg shadow-md">
                <div className="mb-6">
                    <h1 className="font-bold text-2xl mb-2">Your Company Name</h1>
                    <p className="text-gray-500">
                        What would you like to give your company Name? You can change this later.
                    </p>
                </div>

                <div className="mb-6">
                    <Label>Company Name</Label>
                    <Input
                        type="text"
                        className="my-2"
                        placeholder="JobHunt, Microsoft, etc."
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={() => navigate('/admin/companies')}>
                        Cancel
                    </Button>
                    <Button onClick={registerNewCompany} disabled={!companyName.trim()}>
                        Continue
                    </Button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default CompanyCreate
