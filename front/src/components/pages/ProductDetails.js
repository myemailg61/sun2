import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ProductDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState([])
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/user/prodDetails/${id}`)
                console.log(res.data)
                setData(res.data)
            } catch (err) {
                console.log(err)
            }
        }

        getData()
    }, [])

    const qtyHnd = (e) => {
        setQuantity(e.target.value)
    }

    return (
        <div className='mt-24'>
            {data?.map((item, index) => {
                return <div key={index}>
                    <div className='flex flex-row justify-between mx-12'>
                        <div className='border border-solid border-gray-300 rounded-md w-8/12'>
                            <div className='h-[60vh] bg-cover bg-center' style={{ backgroundImage: `url(http://localhost:8000/banner/${item.prodImages})` }}></div>
                            <div className='flex flex-row justify-center gap-4 mt-8'>
                                {item.prodImages.split(",").map((pic, index) => {
                                    return <div key={index} className='h-[12vh] w-12 border border-solid border-gray-700 bg-cover bg-center' style={{ backgroundImage: `url(http://localhost:8000/banner/${pic})` }}></div>
                                })}
                            </div>
                        </div>
                        <div className='border border-solid border-gray-300 w-3/12'>
                            <p className='font-font1 text-center text-4xl font-semibold mt-4'>{item.name}</p>
                            <p className='font-font1 text-center text-lg mt-4'>Brand: {item.manufacturerName}</p>
                            <p className='font-font1 text-center text-lg'>Availability: In Stock</p>
                            <p className='font-font1 text-center text-2xl font-semibold mt-4'>Rs. {item.price}.00</p>
                            <p className='font-font1 text-center text-lg'>GST: {item.gst}%</p>
                            <div className='flex flex-row justify-center gap-4 font-font1 mt-4'>
                                <label>Quantity:</label>
                                <input onChange={qtyHnd} type='number' min={0} className='border font-font1 text-xl text-center rounded border-solid w-16 border-gray-400'></input>
                            </div>
                            <button className='bg-blue-300 mt-4 font-font1 mx-auto block py-2 px-4 rounded-md hover:bg-blue-400'>Add To Cart</button>
                        </div>
                    </div>

                    {/* description */}
                    <div className='mt-8 mx-12'>
                        <p className='text-center font-font1 text-xl'>Description</p>
                        <p className='font-font1 text-lg'>{item.description}</p>
                    </div>
                </div>
            })}
        </div>
    )
}

export default ProductDetails;