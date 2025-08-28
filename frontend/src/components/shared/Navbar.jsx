import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { User2, LogOut } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { setUser } from '../../redux/authSlice'
import { motion } from 'framer-motion'
import { assets } from '../../imgs/assets'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
const backendUrl = import.meta.env.VITE_USER_API_END_POINT;
    const logoutHandler = async () => {
        try {
            const res = await axios.get(backendUrl + `/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='bg-white shadow-md'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                      <img src={assets.dreamdesk} alt="DreamDesk" className='w-28 sm:w-32 lg:w-40' />
                </motion.div>

                <div className='flex items-center gap-12'>
                    <motion.ul
                        className='flex font-medium items-center gap-5'
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                    >
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li><Link to='/admin/companies'>Companies</Link></li>
                                <li><Link to='/admin/jobs'>Jobs</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to='/'>Home</Link></li>
                                <li><Link to='/jobs'>Jobs</Link></li>
                                <li><Link to='/browse'>Browse</Link></li>
                            </>
                        )}
                    </motion.ul>

                    {!user ? (
                        <motion.div
                            className='flex items-center gap-2'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Link to="/login">
                                <Button variant="outline" whileHover={{ scale: 1.05 }}>Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]" whileHover={{ scale: 1.05 }}>Signup</Button>
                            </Link>
                        </motion.div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
                                    <Avatar>
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </motion.div>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div>
                                    <div className='flex gap-4 space-y-2'>
                                        <Avatar>
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user?.fullname}</h4>
                                            <p className='text-sm text-muted-foregound'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>

                                    <div className='flex flex-col my-2 text-gray-600'>
                                        {user && user.role === 'student' && (
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <User2 />
                                                <Button className="border-none" variant="link">
                                                    <Link to='/profile'>View Profile</Link>
                                                </Button>
                                            </div>
                                        )}

                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Button onClick={logoutHandler} className="border-none" variant="link">Logout</Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar
