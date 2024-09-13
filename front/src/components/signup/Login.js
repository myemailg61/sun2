import React, { useState, useEffect } from 'react'
import classes from './Login.module.css'
import axios from 'axios'

const Login = () => {
    const [pass, setPass] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [data, setData] = useState({
        Name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPass: ""
    })

    const signLoginHnd = () => {
        setIsSignup(!isSignup)
    }

    const showPassHnd = (e) => {
        setPass(!pass)
    }

    const hndChg = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const hndSubmit = async (e) => {
        e.preventDefault()
        if (isSignup) {
            if (data.confirmPass !== data.password) {
                alert("password and confirm password not matches")
                return
            }

            try {
                setIsSubmitting(true)
                const res = await axios.post("http://localhost:8000/signup", { data })
                if (res.status == 200) {
                    setIsSubmitting(false)
                    alert("Account created successfully")
                } else if (res.status == 400) {
                    setIsSubmitting(false)
                    alert("data")
                }
            } catch (err) {
                setIsSubmitting(false)
                alert("Account already exists")

            }
            return;
        }

        // //////////
        if (!isSignup) {
            try {
                setIsSubmitting(true)
                const res = await axios.post("http://localhost:8000/login", { data })
                console.log(res.data)
                //console.log(res.data['token'])
                localStorage.setItem('token', res.data['token'])
                setIsSubmitting(false)
                if (res.status == 200) {
                    alert("login success")
                }
            } catch (err) {
                setIsSubmitting(false)
                //console.log(err)
                if (err.response.status == 401) {
                    alert("password or mobile number incorrect")
                } else if (err.response.status == 409) {
                    alert("No records found, please signup")
                }
            }

        }


    }

    return (
        <div className={classes.contain}>

            <p className='text-4xl text-center pt-4 font-medium'>{isSignup ? "Register" : "Login"}</p>

            <div className='bg-white shadow-md w-8/12 mx-auto block mt-20 px-40 py-12 rounded-xl'>
                <form onSubmit={hndSubmit}>
                    <div className='flex flex-col'>
                        {isSignup && <input onChange={hndChg} name="Name" type='text' className='bg-gray-100 shadow rounded-md  h-12 text-center mb-12 border border-solid border-gray-300' placeholder='Name' required></input>}
                        {isSignup && <input onChange={hndChg} name="email" type='text' className='bg-gray-100 shadow rounded-md  h-12 text-center mb-12 border border-solid border-gray-300' placeholder='Email' required></input>}
                        <input onChange={hndChg} name="mobile" type='text' className='bg-gray-100 shadow rounded-md  h-12 text-center mb-12 border border-solid border-gray-300' placeholder='Mobile' required></input>
                        <input onChange={hndChg} name="password" type={pass ? "text" : "password"} placeholder='Password' className='bg-gray-100 shadow rounded-md  h-12 text-center mb-12 border border-solid border-gray-300' required></input>
                        {isSignup && <input onChange={hndChg} name="confirmPass" type={pass ? "text" : "password"} placeholder='Confirm Password' className='bg-gray-100 shadow rounded-md  h-12 text-center mb-4 border border-solid border-gray-300'></input>}
                        <div className='mx-auto block mb-12 text-gray-500'>
                            <input checked={pass} onClick={showPassHnd} type='checkbox' className='transform scale-150 mr-4'></input> <label>Show Password</label>
                        </div>
                        <button type='submit' className={`${isSubmitting ? 'bg-gray-400' : 'bg-green-500'} shadow-lg h-12  rounded-md`}>Submit</button>
                    </div>
                </form>
                <p className='mt-2 text-center text-gray-500'>Don't have an account?.
                    <button onClick={signLoginHnd} className='bg-gray-100 ml-2'>{isSignup ? "Login" : "Register"}</button></p>
            </div>
        </div>
    )
}

export default Login;