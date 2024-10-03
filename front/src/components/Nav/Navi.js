// Navbar.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navi = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800 fixed w-full top-0 left-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center text-white">
                        <span className="font-bold text-xl">Logsun</span>
                    </div>
                    <div className="hidden md:flex md:space-x-8">
                        <NavLink
                            to="/"
                            className={({ isActive }) => `text-gray-300 hover:text-white ${isActive ? 'text-white font-bold' : ''} flex items-center`}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) => `text-gray-300 hover:text-white ${isActive ? 'text-white font-bold' : ''} flex items-center`}
                        >
                            About
                        </NavLink>

                        <NavLink
                            to="/contact"
                            className={({ isActive }) => `text-gray-300 hover:text-white ${isActive ? 'text-white font-bold' : ''} flex items-center`}
                        >
                            Contact
                        </NavLink>

                        <Link to='/login'> <button className='bg-white px-4 py-1 font-font1 rounded-lg hover:bg-gray-200'>Login</button></Link>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <NavLink
                        to="/"
                        className={({ isActive }) => `text-gray-300 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 ${isActive ? 'bg-gray-700 text-white font-bold' : ''} flex items-center`}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) => `text-gray-300 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 ${isActive ? 'bg-gray-700 text-white font-bold' : ''} flex items-center`}
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/services"
                        className={({ isActive }) => `text-gray-300 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 ${isActive ? 'bg-gray-700 text-white font-bold' : ''} flex items-center`}
                    >
                        Services
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) => `text-gray-300 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 ${isActive ? 'bg-gray-700 text-white font-bold' : ''} flex items-center`}
                    >
                        Contact
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navi;
