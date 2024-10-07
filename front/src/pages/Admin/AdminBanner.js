import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AdminBanner = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [profile, setProfile] = useState('')
    const [data, setData] = useState()

    const imageHnd = (e) => {
        setProfile(e.target.files[0])
    }

    const HndSbt = async (e) => {
        e.preventDefault()

        try {
            const formdata = new FormData()

            formdata.append('profile', profile)

            const res = await axios.post("http://localhost:8000/admin/postBanner", formdata);

            if (res.status === 200) {
                alert("Added Successfully")
            }
        } catch (err) {
            alert(err.response?.data)
        }
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get("http://localhost:8000/user/getBanner")
                console.log(res.data)
                setData(res.data)
            } catch (err) {
                console.log(err)
            }
        }

        getData()
    }, [])

    return (
        <div className='border border-solid border-black mt-12 pb-8 pt-4'>
            <p className='mb-2 text-center font-font1 text-xl font-medium'>Current List Of Images</p>
            <div className=' flex flex-row justify-center gap-2 mb-8'>
                {data?.map((banner, index) => {
                    return <div key={index} className='h-32 w-2/12'>
                        <div key={index} className='bg-red-100 h-full w-full bg-cover  bg-no-repeat bg-center' style={{ backgroundImage: `url(http://localhost:8000/banner/${banner.name})` }}>

                        </div>
                    </div>
                })}
            </div>

            <p className='mb-2 font-font1 text-center text-xl font-medium'>Add Banner Images To Home Page</p>

            <div className=''>
                <form onSubmit={HndSbt} className='space-y-4 flex flex-col w-6/12 mx-auto'>

                    <input onChange={imageHnd} type='file' accept="image/*" name="profile" className='mx-auto'></input>
                    <button type='submit' className={`mb-4 ${isSubmitting ? 'bg-green-200' : 'bg-green-500'} py-2 rounded hover:bg-green-600 font-font1`}>{isSubmitting ? "Wait..." : "Submit"}</button>
                </form>
            </div>
        </div>
    )
}

export default AdminBanner