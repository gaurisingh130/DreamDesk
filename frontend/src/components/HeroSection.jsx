import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <motion.div 
            className='text-center'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <motion.div className='flex flex-col gap-5'>
                <motion.span 
                    className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    No. 1 Job Hunt Website
                </motion.span>

                <motion.h1 
                    className='text-5xl font-bold'
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    Search , Apply & <br /> Get Your <span className='text-[#6a38c2]'>Dream Jobs</span>
                </motion.h1>

                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae deleniti natus modi temporibus! Magnam.
                </motion.p>

                <motion.div 
                    className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <input
                        type="text"
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder='Find your dream jobs'
                        className='outline-none border-none w-full'
                    />
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6a38c2]">
                            <Search className='h-5 w-5' />
                        </Button>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default HeroSection
