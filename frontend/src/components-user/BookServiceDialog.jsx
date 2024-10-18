// component which allows visitors to send request for service/s

import React, { useState , useContext } from 'react';
import axios from 'axios';
import { PropContext } from '../context/PropContext';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const BookService = ({ isOpen, onClose, serviceData, onSubmit }) => {

  const {allProps, pIDList} = useContext(PropContext)
  const title_field = allProps[0] // Title field of the service category

  const [visitorInfo, setVisitorInfo] = useState({
    fullName: '',
    address: '',
    email: '',
    mobile: '',
    note: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisitorInfo({ ...visitorInfo, [name]: value });
  };

  const handleSubmit = async () => {

    const formData = {};
    formData['ServiceID'] = serviceData.ServiceID; // Main Service Category ID
    formData['PK_n'] = serviceData.PK_n; // Add selected service primary key number
    formData['title'] = serviceData['props'][title_field]; // Add selected service name

    formData['fullName'] = visitorInfo.fullName;
    formData['address'] = visitorInfo.address;
    formData['email'] = visitorInfo.email;
    formData['phone'] = visitorInfo.mobile;
    formData['note'] = visitorInfo.note;
    // Pass visitor info and selected service info to the parent handler

    console.log(formData)
    
    try{
      await axios.post(`${backendUrl}/book`, formData)
      alert('Request sent successfully')
    }
    catch (error) {
      console.log(error)
      alert(`Error: ${error}`);
    }
    

    onClose(); // Close the modal after submitting
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-6">Request Service: {serviceData.props.serviceName}</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={visitorInfo.fullName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={visitorInfo.address}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={visitorInfo.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile No. (WhatsApp)"
            value={visitorInfo.mobile}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="note"
            placeholder="Additional Info (optional)"
            value={visitorInfo.note}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          ></textarea>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button onClick={onClose} className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookService;
