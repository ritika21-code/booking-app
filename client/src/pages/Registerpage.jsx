import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Registerpage = () => {
    const[name,setname]=useState(' ');
    const[email,setemail]=useState('');
    const[password,setpassword]=useState('')
    const registeruser=async(ev)=>{
        ev.preventDefault();
try{   await axios.post('/register',{
        name,
        email,
        password,
    })
    alert('Registration Successful')}catch(e){
      alert('Registration failed. Please try again.')
    }
    }
  
  return (
    <div className='mt-4 grow flex items-center justify-around'><div className='mb-32'>
      <h1 className='text-4xl text-center mb-4'>Register</h1>
      <form className='max-w-md mx-auto '
      onSubmit={registeruser}>
       
        <input type='text' placeholder='Ritika'
        value={name}
        onChange={(e)=>setname(e.target.value)}></input>
        <input type='email' placeholder='you@gmail.com'
        value={email}
        onChange={(e)=>setemail(e.target.value)}></input>
        <input type='password' placeholder='password'
        value={password}
        onChange={(e)=>setpassword(e.target.value)}></input>
<button className='primary'>Register</button>
<div className='text-center py-2 text-gray-500'>Already a member? <Link to={"/login"} className= 'underline text-black'>Login Now</Link>
</div>
      </form>
    </div></div>
  )
}

export default Registerpage