import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ProductsList = () => {
    const [data, setData] = useState()

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get('http://localhost:8000/admin/getProducts')
                setData(res.data)
            } catch (err) {
                console.log(err)
            }

        }

        getData()
    }, [])
    return (
        <div className='mt-4'>
            <p className='text-center font-font1 text-xl font-semibold'>ProductsList</p>

            <div className='flex flex-row justify-center gap-4'>
                {data?.map((product, index) => {
                    return <div key={index} className='border border-solid border-gray-300 py-4 px-4 rounded-xl'>
                        <img src=''></img>
                        <p className='font-font1'>Name: {product.name}</p>
                        <p className='font-font1'>Price: {product.price}</p>
                        <p className='font-font1'>Quantity: {product.quantity}</p>

                        <div className='flex flex-row justify-center gap-2'>
                            <button className='bg-red-300 font-font1'>Edit</button>
                            <button className='bg-red-300 font-font1'>Activate</button>
                            <button className='bg-red-300 font-font1'>Delete</button>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default ProductsList