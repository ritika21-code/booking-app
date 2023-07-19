import React, { useContext,useState,useEffect } from 'react'
import {differenceInCalendarDays} from "date-fns";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { usercontext } from '../Context';
const Bookingwidget = ({place}) => {
  const[checkin,setcheckin]=useState('');
  const[checkout,setcheckout]=useState('');
  const[numberofguest,setnumberofguest]=useState(1);
  
  const [name,setName] = useState('');
  const [phone,setPhone] = useState('');
  const[redirect,setredirect]=useState('')
  const {user} = useContext(usercontext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);
  let numberOfNights = 0;
  if (checkin && checkout) {
    numberOfNights = differenceInCalendarDays(new Date(checkout), new Date(checkin));
  }
const bookthisplace=async()=>{
  const response = await axios.post('/bookings', {
    checkin,checkout,numberofguest,name,phone,
    place:place._id,
    price:numberOfNights * place.price,
  });
  const bookingId=response.data._id;
  setredirect(`/account/bookings/${bookingId}`)
}
if(redirect){
  return <Navigate to={redirect}/>
}
  return (
    <div className='bg-white shadow p-4 rounded-2xl'>
    <div className=' font-bold text-xl text-center'>
      Price: ${place.price} / Per night
    </div>
    <div className='border rounded-2xl mt-4'>
      <div className='flex'>
        <div className='py-3 px-4 border rounded-2xl' >
          <label className='underline font-semibold'>Check-in:</label>
          <input type='date' name='check-in' value={checkin} onChange={(e)=>{setcheckin(e.target.value)}}/>
        </div>
        <div className='py-3 px-4 border rounded-2xl'>
          <label className='underline font-semibold'>Check-Out:</label>
          <input type='date' name='check-in' value={checkout} onChange={(e)=>{setcheckout(e.target.value)}} />
        </div>


      </div>
      <div className='py-3 px-4 border rounded-2xl'>
        <label className='underline font-semibold'>Number of guests:</label>
        <input type='number' name='check-in' value={numberofguest} onChange={(e)=>{setnumberofguest(e.target.value)}} />
      </div>
      {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label className='underline font-semibold'>Your full name:</label>
            <input type="text"
                   value={name}
                   onChange={ev => setName(ev.target.value)}/>
            <label className='underline font-semibold'>Phone number:</label>
            <input type="tel"
                   value={phone}
                   onChange={ev => setPhone(ev.target.value)}/>
          </div>
        )}

    </div>
    
  <div className='text-center m-2 py-3 px-4 border rounded-2xl'>Total Price : {numberOfNights > 0 ? (
          <span className='font-bold'> ${numberOfNights * place.price}</span>
        ):"0"}
        </div>
 {(numberofguest <= place.maxGuests) ? (  
 <button className='primary' onClick={bookthisplace}>Book this place</button>):(<div className='border m-2 p-3 bg-red-400 text-center'>Number of guests limit exceeded. 
 Please check again.</div>)}
  </div>

  )
}

export default Bookingwidget