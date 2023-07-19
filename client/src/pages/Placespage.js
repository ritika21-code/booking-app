// import React, { useEffect, useState } from 'react'
// import { Link, Navigate, useParams } from 'react-router-dom'
// import Perks from '../Perks';
// import PhotosUploader from '../PhotosUploader';
// import axios from 'axios';
// import Myplacespage from './Myplacespage';
// import AccountNav from './Accountpage';
// const Placespage = () => {
//   const {id,action} = useParams();
//   const [title,setTitle] = useState('');
//   const [address,setAddress] = useState('');
//   const [addedPhotos,setAddedPhotos] = useState([]);
//   const [description,setDescription] = useState('');
//   const [perks,setPerks] = useState([]);
//   const [extraInfo,setExtraInfo] = useState('');
//   const [checkIn,setCheckIn] = useState('');
//   const [checkOut,setCheckOut] = useState('');
//   const [maxGuests,setMaxGuests] = useState(1);
//   const [price,setPrice] = useState(100);
//   const [redirect,setRedirect] = useState(false);
  



//   function inputHeader(text) {
//     return (
//       <h2 className="text-2xl mt-4">{text}</h2>
//     );
//   }
//   function inputDescription(text) {
//     return (
//       <p className="text-gray-500 text-sm">{text}</p>
//     );
//   }
//   function preInput(header,description) {
//     return (
//       <>
//         {inputHeader(header)}
//         {inputDescription(description)}
//       </>
//     );
//   }

//   async function savePlace(ev) {
//     ev.preventDefault();
  
//  const placeData=await axios.post('/places', {
//       title, address, addedPhotos,
//       description, perks, extraInfo,
//       checkIn, checkOut, maxGuests, price,
//     })
//     // if (id) {
//     //   // update
//     //   await axios.put('/places', {
//     //     id, ...placeData
//     //   });
//     //   setRedirect(true);
//     // } else {
//     //   // new place
//     //   await axios.post('/places', placeData);
//     //   setRedirect(true);
//     // }
     
    

//   }

//   if (redirect) {
//     return <Navigate to={'/account/places'} />
//   }

//   return (
    
//     <div>
//      <AccountNav/>
//      {action!=='new' && <Myplacespage/>}
    
//     </div>
//   )
// }

// export default Placespage