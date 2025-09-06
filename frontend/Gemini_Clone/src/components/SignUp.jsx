import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { EyeIcon } from '@heroicons/react/24/outline';
import axios from "axios"


const SignUp = () => {

    const[form, setForm]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:""
    })

    const[error,setError]=useState("");
    const[load,setLoad]=useState(false);

    const navigate=useNavigate()

    const handleChange=(e)=>{
        const value=e.target.value;
        const name=e.target.name;

        setForm({
            ...form,
            [name]:value
        }
        )
    }

    const handleSignUp=async ()=>{

        setError("")
        setLoad(true)
        try {
            const data = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/vl/user/signup`, {
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    password: form.password
}, {
    withCredentials: true,
});

            alert(data.message ||"signUp Succedded")
            navigate("/login")
        }
        catch (error) {
            const mes=error?.response?.data?.errors || "SignUp Failed"
            setError(mes)
        }
        finally{
            setLoad(false)
        }
    }

    return (
        <div className='min-h-screen flex justify-center items-center bg-black px-4'>
            <div className='bg-[#1e1e1e] text-white max-w-md w-full rounded-2xl p-6 shadow-lg'>

                <h1 className='text-white items-center justify-center text-center'>SignUp</h1>
                <div className='mb-4 mt-2 '>
                    <input className='w-full border bg-transparent border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0]' type="text" name='firstName' placeholder='FirstName'
                    value={form.firstName} 
                    onChange={handleChange}/>
                </div>

                <div className='mb-4 mt-2'>
                    <input  className=' w-full border bg-transparent border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0]' type="text" name='lastName' placeholder='LastName'
                    value={form.lastName} 
                    onChange={handleChange} />
                </div>
                <div className='mb-4 mt-2'>
                    <input  className='w-full border bg-transparent border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0]' type="text" name='email' placeholder='Email'
                    value={form.email} 
                    onChange={handleChange} />
                </div>
                <div className='relative mb-4 mt-2'>
                    <input  className='w-full border bg-transparent border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0]' type="password" name="password" placeholder='Password'
                    value={form.password} 
                    onChange={handleChange} />
                    <span className='absolute text-gray-400 right-3 top-[0.65rem] '><EyeIcon className='w-5 h-5'/></span>
                </div>
                {/*Error Message */}
                {error && <span className='text-red-600 text-sm mb-4'>{error}</span>}

                {/*Terms and Conditions */}
                <p className='text-xs text-gray-00 mt-4 mb-6'>By signing up or logging in, you consent to Assistly's{" "} <a href="" className='underline'>Terms of Use</a> and <a href="" className='underline'>Privacy Policy</a>.</p>
                {/*SignUp */}
                <button onClick={handleSignUp} disabled={load} className='bg-[#7a6ff6] w-full hover:bg-[#6c61a6] text-white font-semibold py-3 rounded-lg transition disabled:opacity-50'>
                    {load? "SigningUp...":"SignUp"}</button>
                {/*Login */}
                <div className='flex justify-between mt-4 text-sm'>
                    <a href="" className='hover:underline text-[#7a6ff6] hover:text-[#6c61a6]'>Already Registered?</a>
                    <Link className='hover:underline text-[#7a6ff6] hover:text-[#6c61a6]' to={"/login"} >Login</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp