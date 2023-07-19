import axios from 'axios';
import React,{ useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { usercontext } from '../Context';

const Loginpage = () => {
  const[email,setemail]=useState('');
  const[password,setpassword]=useState('')
  const[redirect,setredirect]=useState(false)
  const {setuser}=useContext(usercontext)
  const handleloginuser=async(ev)=>{
   
    ev.preventDefault();
try {
  const userInfo=await axios.post('/login',{email,password})
  alert('login success')
  setuser(userInfo.data)
  setredirect(true)
} catch (e) {
  alert('login failed')
}
}
if(redirect){
  return <Navigate to={'/'}/>
}
  return (
    <div className='mt-4 grow flex items-center justify-around'><div className='mb-32'>
      <h1 className='text-4xl text-center mb-4'>Login</h1>
      <form className='max-w-md mx-auto ' onSubmit={handleloginuser}>
       
      <input type='email' placeholder='you@gmail.com'
        value={email}
        onChange={(e)=>setemail(e.target.value)}></input>
        <input type='password' placeholder='password'
        value={password}
        onChange={(e)=>setpassword(e.target.value)}></input>
<button className='primary'>Login</button>
<div className='text-center py-2 text-gray-500'>Dont't have an account yet? <Link to={"/register"} className= 'underline text-black'>Register Now</Link>
</div>
      </form>
    </div></div>
  )
}

export default Loginpage