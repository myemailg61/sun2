import React from 'react'
import { Link } from 'react-router-dom'

import facebook from '../asset/facebook.png'
import insta from '../asset/instagram.png'

const Footer = () => {
    return (
        <div className='flex flex-row bg-slate-300 pt-8 pb-12 justify-center gap-4 px-4'>
            <div className='w-4/12'>
                <p className='text-3xl font-semibold'>Logo</p>
                <p className='mt-4 font-font1'>With a commitment to quality and reliability, [Your Company Name] delivers top-notch electrical equipment for every need. Let us light the way to a brighter, more electrifying future!</p>
            </div>
            <div className='w-2/12 '>
                <p className=' text-xl font-medium'>Quick Links</p>
                <Link></Link><p className=' mt-2 text-base font-font1'>Home</p>
                <Link><p className=' mt-2 text-base font-font1'>About Us</p></Link>
                <Link><p className=' mt-2 text-base font-font1'>Contact Us</p></Link>
                <Link to='/adminDashboard'><p className=' mt-2 text-base font-font1'>Dashboard</p></Link>

            </div>
            <div className='w-2/12 '>
                <p className=' text-xl font-medium'>Company</p>
                <p className=' mt-2 text-base font-font1'>Terms & Conditions</p>
                <p className=' mt-2 text-base font-font1'>Privacy Policy</p>
            </div>
            <div className='w-3/12 '>
                <p className=' text-xl font-medium'>Contact Us</p>
                <div className='flex flex-row mt-4 gap-4'>
                    <img src={facebook} className='w-8'></img>
                    <img src={insta} className='w-8'></img>
                </div>
            </div>
        </div>
    )
}

export default Footer;