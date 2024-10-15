import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

const CategoryProducts = () => {
    const [data, setData] = useState()
    const [name, setName] = useState('')

    useEffect(() => {
        const name = localStorage.getItem("subCat")
        setName(name)

        const getData = async () => {
            try {
                const res = await axios.get("http://localhost:8000/user/getSubCat", { params: { name } })
                console.log(res.data)
                setData(res.data)
            } catch (err) {

                console.log(err.message)
            }
        }

        getData();
    }, [])
    return (
        <div className='mt-28 mb-20'>
            <p className='font-font1 text-3xl font-semibold text-center mb-8'>{name}</p>

            <div className='flex flex-row justify-center gap-8'>
                {data?.map((item, index) => {
                    return <div key={index}
                        className=' justify-center w-3/12 gap-4 border border-solid border-gray-300 rounded-md'>
                        <div className='h-56 w-full bg-cover bg-center' style={{ backgroundImage: `url(http://localhost:8000/banner/${item.prodImages})` }}></div>
                        <p className='font-font1 text-center mt-4 text-xl font-semibold'>{item.name}</p>
                        <p className='text-center font-font1 text-lg'>Rs.{item.price}.00</p>
                        <div className='flex flex-row justify-center gap-4 mb-2 mt-4 border-t border-gray-300'>
                            <button className='bg-blue-300 px-4 py-2 rounded-md hover:bg-blue-400 mt-2'>Add To Cart</button>
                            <Link to={`/details/${item.id}`}><button className='bg-blue-300 px-4 py-2 rounded-md hover:bg-blue-400 mt-2'>Details</button></Link>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default CategoryProducts