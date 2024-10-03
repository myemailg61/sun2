import React, { useEffect, useState } from 'react'
import Product from './Product';
import Products2 from './Products2';

const Dashboard = () => {
    const [dummy, setDummy] = useState(false)
    const [option, setOption] = useState()

    const hndCategory = (name) => {
        localStorage.setItem("option", name)
        setDummy(!dummy)
    }

    useEffect(() => {
        localStorage.setItem("option", "add")
    }, [])

    useEffect(() => {
        const getOption = () => {
            const res = localStorage.getItem("option")
            setOption(res)
        }

        getOption()


    }, [dummy])

    return (
        <div className='mt-20 mx-4 mb-20'>
            <p className='font-font1 text-2xl font-semibold text-center'>Admin Dashboard</p>

            <div className='flex flex-row gap-8'>

                <div className='flex flex-col border border-solid border-teal-500 px-6 py-4'>
                    <p className='font-font1 text-xl font-semibold mb-4'>Actions</p>
                    <button onClick={() => { hndCategory("add") }} className='font-font1 font-semibold mb-2 bg-teal-300 py-2 px-4 rounded-lg hover:bg-teal-400'>Add Product</button>
                    <button onClick={() => { hndCategory("list") }} className='font-font1 font-semibold mb-2 bg-teal-300 py-2 px-4 rounded-lg hover:bg-teal-400'>Products List</button>
                    <button onClick={() => { hndCategory("account") }} className='font-font1 font-semibold mb-2 bg-teal-300 py-2 px-4 rounded-lg hover:bg-teal-400'>Admin Account</button>
                    {/* <button onClick={() => { hndCategory("") }} className='font-font1 font-semibold mb-2 bg-teal-300 py-2 px-2 rounded-lg hover:bg-teal-400'>Add Product</button>
                    <button onClick={() => { hndCategory("") }} className='font-font1 font-semibold mb-2 bg-teal-300 py-2 px-2 rounded-lg hover:bg-teal-400'>Add Product</button> */}
                </div>

                <div className='w-7/12'>
                    {option == "add" && <Product></Product>}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;