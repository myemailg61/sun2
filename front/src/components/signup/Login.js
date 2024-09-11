import React, { useState, useEffect } from 'react'
import classes from './Login.module.css'

const Login = () => {
    const [pass, setPass] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [data, setData] = useState({
        Name: "",
        email: "",
        mobile: "",
        password: ""
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

    const hndSubmit = (e) => {
        e.preventDefault()
        console.log(data, " data")
    }

    return (
        <div className={classes.contain}>
            <p className='text-4xl text-center pt-4 font-medium'>{isSignup ? "Register" : "Login"}</p>

            <div className='bg-white shadow-md w-8/12 mx-auto block mt-20 px-40 py-12 rounded-xl'>
                <form onSubmit={hndSubmit}>
                    <div className='flex flex-col'>
                        {isSignup && <input onChange={hndChg} name="Name" type='text' className='bg-gray-100 shadow rounded-md  h-12 text-center mb-12 border border-solid border-gray-300' placeholder='Name'></input>}
                        <input onChange={hndChg} name="mobile" type='text' className='bg-gray-100 shadow rounded-md  h-12 text-center mb-12 border border-solid border-gray-300' placeholder='Mobile'></input>
                        <input onChange={hndChg} name="password" type={pass ? "text" : "password"} placeholder='Password' className='bg-gray-100 shadow rounded-md  h-12 text-center mb-12 border border-solid border-gray-300'></input>
                        {isSignup && <input name="confirm" type={pass ? "text" : "password"} placeholder='Confirm Password' className='bg-gray-100 shadow rounded-md  h-12 text-center mb-4 border border-solid border-gray-300'></input>}
                        <div className='mx-auto block mb-12 text-gray-500'>
                            <input checked={pass} onClick={showPassHnd} type='checkbox' className='transform scale-150 mr-4'></input> <label>Show Password</label>
                        </div>
                        <button className='bg-green-500 shadow-lg h-12  rounded-md'>Submit</button>
                    </div>
                </form>
                <p className='mt-2 text-center text-gray-500'>Don't have an account?.
                    <button onClick={signLoginHnd} className='bg-gray-100 ml-2'>{isSignup ? "Login" : "Register"}</button></p>
            </div>
        </div>
    )
}

export default Login;