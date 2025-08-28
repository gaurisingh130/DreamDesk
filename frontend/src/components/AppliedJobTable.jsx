import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);
    console.log(allAppliedJobs);

    return (
        <div className="overflow-x-auto">
            <Table className="shadow-md rounded-lg">
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className={'text-right'}>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs?.length <= 0 ? (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="block p-4 text-center"
                        >
                            You haven't applied any job yet.
                        </motion.span>
                    ) : (
                        allAppliedJobs?.map((appliedJob) => (
                            <motion.tr
                                key={appliedJob._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="hover:shadow-lg rounded-lg"
                            >
                                <TableCell>{appliedJob.createdAt.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob.job.title}</TableCell>
                                <TableCell>{appliedJob.job.company.name}</TableCell>
                                <TableCell className='text-right'>
                                    <Badge className={`${appliedJob?.status === 'rejected' ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </motion.tr>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable
