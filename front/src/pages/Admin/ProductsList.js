import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ProductsList = () => {
    const [data, setData] = useState()

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get('http://localhost:8000/admin/getProducts')
                console.log(res.data)
            } catch (err) {
                console.log(err)
            }

        }

        getData()
    }, [])
    return (
        <div className='mt-32'>ProductsList</div>
    )
}

export default ProductsList