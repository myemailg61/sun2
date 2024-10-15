import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [openSubDropdown, setOpenSubDropdown] = useState(null);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await axios.get("http://localhost:8000/user/getCategory");
                setCategories(res.data);
                console.log(res.data)
            } catch (err) {
                console.log(err);
            }
        };

        getCategories();
    }, []);

    const subCatHnd = (itemName) => {
        localStorage.setItem("subCat", itemName)
    }

    return (
        <div className='mt-16 inline-block border border-solid border-gray-500 rounded-lg'>
            <div className='bg-black w-full py-2 px-1'>
                <p className='font-font1 bg-black text-white text-xl font-semibold'>All Categories</p>
            </div>

            <div className='flex flex-col'>
                {categories.map((item, index) => (
                    <div
                        key={index}
                        className='relative inline-block'
                        onMouseEnter={() => setOpenDropdown(index)}
                        onMouseLeave={() => {
                            setOpenDropdown(null);
                            setOpenSubDropdown(null);
                        }}
                    >
                        <button
                            className="bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 focus:outline-none"
                        >
                            {item.category}
                        </button>
                        {openDropdown === index && (
                            <div key={index} className="absolute left-full top-0 w-40 bg-white shadow-lg rounded-lg">
                                {Object.keys(item).reduce((acc, key) => {
                                    if (key !== "category") {
                                        acc.push(key);
                                    }
                                    return acc;
                                }, []).map((subCat, subIndex) => (
                                    <div
                                        key={subIndex}
                                        onMouseEnter={() => setOpenSubDropdown(subIndex)}
                                        onMouseLeave={() => setOpenSubDropdown(null)}
                                        className="relative"
                                        onClick={() => { subCatHnd(subCat) }}
                                    >
                                        <Link to='/categoryProduct' className="block px-4 py-2 text-black hover:bg-gray-200">
                                            {subCat}
                                        </Link>
                                        {openSubDropdown === subIndex && (
                                            <div className="absolute left-full top-0 w-40 bg-white shadow-lg rounded-lg">
                                                {/* Replace with actual subcategory items if needed */}
                                                {item[subCat].map((subcat2, index) => {
                                                    return <Link className="block px-4 py-2 text-black hover:bg-gray-200"
                                                        {...(subcat2 !== '-' ? { to: '/subCategoryProduct' } : {})}>
                                                        {subcat2}
                                                    </Link>
                                                })}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
