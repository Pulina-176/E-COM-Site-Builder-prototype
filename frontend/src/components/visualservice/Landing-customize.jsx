//for Other Pages (except Landing)

import React, { useState, useCallback } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import RichTextEditor_advanced from './RichTextEditor-Advanced';
import axios from 'axios';
import { storage } from '../../firebase';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const frontendUrl = import.meta.env.VITE_FRONTEND_URL;

const Landing_customize = () => { //boolean prop to check if landing or not.
    const [isOpen, setIsOpen] = useState(false); //is the popup open?
    const [activeSection, setActiveSection] = useState('color');  //image or color side is active?
    const [selectedColor, setSelectedColor] = useState('#ffffff');

    //for bg-image settings of Navbar/Header
    const [imageFile, setImageFile] = useState(null);

    //for typograhy settings of Navbar
    const [selectedFontStyle, setSelectedFontStyle] = useState('Arial');
    const [selectedFontSize, setSelectedFontSize] = useState(16);
    const [selectedFontColor, setSelectedFontColor] = useState('#000000');
  
    const togglePopup = () => {
      setIsOpen(!isOpen);
    };
  
    const handleColorChange = (e) => {  //for color selection
      setSelectedColor(e.target.value);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    }
  
    const handleSaveImage = useCallback(async () => {
        try {
          if (!imageFile) return;
          const imageRef = ref(storage, `images/${Date.now()}_${imageFile.name}`);
          await uploadBytes(imageRef, imageFile);
          const downloadURL = await getDownloadURL(imageRef);
          return downloadURL;
        } catch (e) {
          console.error('Error saving image', e);
        }
      }, [imageFile]);

      const [description, setDescription] = useState("") //Rich Text Editor value (state to track current changes in editor)

      function getDescriptionText(text) {  //Rich Text Editor onType prop function
        setDescription(text)
        console.log(description)
    }

    // Handle save font settings function
    const handleSaveSettings = async () => {
        const formData = {
          Landing: {
            
          },
        };
      
        if (activeSection === 'color') { //if color is selected
          formData.Landing.color = selectedColor;
          formData.Landing.imageURL = null;
        } else if (activeSection === 'image') { //if image is selected
          try {
            const imageURL = await handleSaveImage(); // Save the image in firebase and get the URL
            console.log('Image URL:', imageURL);
            formData.Landing.imageURL = imageURL;
            formData.Landing.color = null;
          } catch (error) {
            console.error('Error saving image:', error);
            return; // Exit if there's an error saving the image
          }
        }

        formData.Landing.businessTitle = description;
      
        try {
          const response = await axios.patch(`${backendUrl}/display/`, formData);
          console.log('Font settings saved:', response.data);
        } catch (error) {
          console.error('Error saving font settings:', error);
        }
      };
  
    return (
      <div>
        <button
          className="btn btn-accent my-[5px] w-[40%] self-start"
          onClick={togglePopup}
        >
          Pick Image/Color
        </button>
  
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[auto]]">
            <AiFillCloseCircle
              onClick={togglePopup}
              className="absolute top-2 right-2 text-2xl cursor-pointer"
            />
              <h2 className="text-xl font-bold mb-4">Page Header & NavBar styles</h2>
  
              <select
                value={activeSection}
                onChange={(e) => setActiveSection(e.target.value)}
                className="mb-4"
              >
                <option value="color">Color</option>
                <option value="image">Image</option>
              </select>
  
              <div className="flex">
                <div className="flex flex-col p-4 border-r">
                  <h3 className="mb-2">Color Section</h3>
                  <input
                    type="color"
                    value={selectedColor}
                    onChange={handleColorChange}
                    disabled={activeSection !== 'color'}
                    className="mb-2"
                  />
                </div>
  
                <div className="flex flex-col p-4">
                  <h3 className="mb-2">Image Section</h3>
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    disabled={activeSection !== 'image'}
                    className="mb-2"
                  />
                </div>
              </div>

              <div className="flex flex-col p-4 border-r">
                    <h3 className="mb-2">Business Title / Heading</h3>
                    <RichTextEditor_advanced onType={getDescriptionText}/>
                    <button onClick={handleSaveSettings} className="btn bg-green-400 my-[20px] mx-[400px]">
                        Save Changes
                    </button>
                </div>


  
              <button
                onClick={togglePopup}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

export default Landing_customize;
