import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import PlaceGallery from './PlaceGallery';
import AddressLink from './AddressLink';
import Bookingwidget from './Bookingwidget';
const Eachplace = () => {
  const { id } = useParams();
  const [place, setplace] = useState(null);
  useEffect(() => {
    if (!id)
      return;

    axios.get(`/place/${id}`).then(Response => {
      setplace(Response.data)
    })
  }, [id])
  if (!place) return '';

  return (<>
    <div className="mt-4 bg-gray-100 border rounded-2xl -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check-in: {place.checkIn}<br />
          Check-out: {place.checkOut}<br />
          Max number of guests: {place.maxGuests}
        </div>
        <div>
          <Bookingwidget place={place} />

        </div>
{console.log(place.perks)}
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
        <h2 className="font-semibold text-2xl">Perks</h2>
        </div>
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 ">
        {place?.perks?.length > 0 && place.perks.map(perk => (
            <div className='border border-black-300 py-4 shadow px-20 text-black text-center font-bold rounded-2xl gap-2 items-center cursor-pointer' >
              {perk}
            </div>
          ))}
         
          </div>
        <div className='mt-6'>
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
      </div>
    </div>
  </>)
}

export default Eachplace