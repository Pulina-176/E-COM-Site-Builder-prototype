// This is the component to setup the description popup for the product/service if enabled

import React, { useState } from 'react';
import axios from 'axios';
import RichTextEditor from './RichTextEditor';
import { AiFillCloseSquare } from "react-icons/ai";


const backendUrl = import.meta.env.VITE_BACKEND_URL;

const CreateDescription = ({ productID, pk_n }) => {

  
  const [isOpen, setIsOpen] = useState(false);  //Update information form visible/not-visible
  const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

  const [description, setDescription] = useState('');

  const getDescriptionText = (text) => {
    setDescription(text);
  };

  const saveDescription = async () => {
    try {
      const response = await axios.post(`${backendUrl}/products/des/${productID}/${pk_n}`, {
        description: description,
        },
        {withCredentials: true}
      );

      if (response.status === 200) {
        alert('Description saved successfully');
      } else {
        alert('Failed to save description');
      }
    } catch (error) {
      console.error('Error saving description:', error);
      alert('An error occurred while saving the description.');
    }
  };

  return (
    <>
    <button className="bg-green-500 text-white px-4 py-2" onClick={toggleOpen}>Des Page</button>

    {isOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="flex flex-col bg-white p-8 rounded shadow-lg w-3/4 max-w-2xl">
        <button className='mx-[0.5px] self-end' onClick={toggleOpen}><AiFillCloseSquare className='text-4xl'/></button>
        <h2 className="text-2xl font-bold mb-4">Create Description</h2>
        <RichTextEditor initialValue="Type your description here" onType={getDescriptionText} />
        <div className="mt-4 flex justify-end">
          <button className="btn btn-primary" onClick={saveDescription}>
            Save
          </button>
        </div>
      </div>
    </div>
    )}
    </>
  );
};

export default CreateDescription;