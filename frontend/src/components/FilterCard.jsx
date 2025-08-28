import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../redux/jobSlice'
import { motion } from 'framer-motion'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Banglore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-40 K", "42 K-1 lakh", "1 lakh to 5 lakh"]
    }
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState("");
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue))
    }, [selectedValue])

    return (
        <motion.div 
            className='w-full bg-white p-3 rounded-md shadow-md'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h1 className='font-bold text-lg '>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup onValueChange={changeHandler} value={selectedValue}>
                {filterData.map((data, index) => (
                    <motion.div 
                        key={index} 
                        className="my-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <h1 className='font-bold text-lg'>{data.filterType}</h1>
                        {data.array.map((item, idx) => {
                            const itemId = `r${index}-${idx}`;
                            return (
                                <motion.div 
                                    key={itemId} 
                                    className='flex items-center space-x-2 my-2'
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <RadioGroupItem id={itemId} value={item} />
                                    <Label htmlFor={itemId}>{item}</Label>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                ))}
            </RadioGroup>
        </motion.div>
    )
}

export default FilterCard
