import React, { useEffect, useState } from 'react';
import { AiTwotoneDelete, AiTwotoneEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar'; 

const navbarList = ["Home", "Bookings", "Services", "Contact Us"];  // No need this actually

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const RequestsList = () => {
  const [bookings, setBookings] = useState([]);

  // Fetch bookings from the API
  useEffect(() => {
    fetch(`${backendUrl}/book`, {
      method: 'GET',
      credentials: 'include' // This sends cookies with the request
    })
      .then(response => response.json())
      .then(data => setBookings(data))
      .catch(err => console.error('Error fetching bookings:', err));
  }, []);

  // Handle delete action
  const deleteBooking = (id, pk) => {
    fetch(`${backendUrl}/book/${id}/${pk}`, {
      method: 'DELETE',
      credentials: 'include' // This sends cookies with the request
    })
      .then(response => {
        if (response.ok) {
          // Use the functional form of setBookings to ensure you work with the most up-to-date state
          setBookings(prevBookings => 
            prevBookings.filter(booking => !(booking.PK_n === pk && booking.ServiceID === id)) // Only remove if both conditions are met
          );
          console.log('Booking deleted');
        } else {
          console.error('Failed to delete booking');
        }
      })
      .catch(err => console.error('Error deleting booking:', err));
  };

  return (
    <>
    <div className='container'>
      <Navbar pages={navbarList} />  {/* Add the Navbar here */}
      
      <div className='flex flex-row align-center'>
          <h1 className='font-poppins font-extrabold text-4xl ml-[60px] my-[30px]'>Requests List</h1>
      </div>

      <div className='flex flex-col items-center mx-[100px]'>
          {/* Existing table code */}
      </div>
    </div>

    <div className='flex flex-col items-center mx-[100px]'>
      <div className='mb-[100px] w-full bg-white border border-gray-600 rounded-lg overflow-hidden'>
        <table className='font-inter w-full'>
          <thead>
            <tr className='border-b border-gray-600 text-center font-bold bg-purple-300'>
              <td className='py-2 px-4 w-[20%]'>Service Name</td>
              <td className='py-2 px-4 w-[20%]'>Full Name</td>
              <td className='py-2 px-4 w-[20%]'>Email</td>
              <td className='py-2 px-4 w-[20%]'>Mobile</td>
              <td className='py-2 px-4 w-[40%]'>Note</td>
              <td className='py-2 px-4 w-[10%]'></td>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, i) => (
              <tr key={i} className='border-b border-gray-600 h-[40px] hover:bg-gray-100 text-center'>
                <td>{booking.title}</td>
                <td>{booking.fullName}</td>
                <td>{booking.email}</td>
                <td>{booking.phone}</td>
                <td>{booking.note}</td>
                <td className='flex justify-center gap-[20px] mt-[11px] mx-10'>
                  <button onClick={() => document.getElementById(`delete_modal_${i}`).showModal()}>
                    <AiTwotoneDelete />
                  </button>
                  
                  {/* Modal for delete confirmation */}
                  <dialog id={`delete_modal_${i}`} className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Warning!</h3>
                      <p className="pt-4">Are you sure you want to delete this booking?</p>
                      <p className="py-0">All related data will be lost.</p>
                      <p className="py-4">Press ESC key or click the Cancel button below to cancel.</p>
                      <div className="modal-action">
                        <button className='btn bg-red-100' onClick={() => deleteBooking(booking.ServiceID , booking.PK_n)}>Delete</button>
                        <form method="dialog">
                          {/* If there is a button in form, it will close the modal */}
                          <button className="btn bg-green-100">Cancel</button>
                        </form>
                      </div>
                    </div>
                  </dialog>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default RequestsList;
