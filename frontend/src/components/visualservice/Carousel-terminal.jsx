// Handles uploads and deleting of carousal posts

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { storage } from '../../firebase';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const CarouselCenter = () => {
  const [images, setImages] = useState([]);  // flyers/images and descriptions of the carousel

    // Under development: Load and Update from Previous data of carousel flyers 
    // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    // useEffect(() => {
    //     const fetchCarouselData = async () => {
    //         try {
    //             const response = await axios.get(`${backendUrl}/display`);
    //             const carouselImages = response.data.Carousel[0]['imageURL'];
    //             const carouselH5 = response.data.Carousel[0]['h5'];
    //             console.log(carouselImages, carouselH5)
    //             if (carouselH5.length!=0){
    //                 setImages(carouselH5.map((item) => ({ image: null, h5: item })));
    //             }
    //             // if (carouselData) {
    //             //     setImages(carouselData.map((item) => ({ image: null, h5: item })));
    //             // } else {
    //             //     setImages([]);
    //             // }
    //             console.log(images)
    //         } catch (error) {
    //             console.error('Error fetching carousel data:', error);
    //         }
    //     };

    //     fetchCarouselData();
    // }, []);

  const handleAddImage = () => { // decide to add another poster, generates new box to enter details
    if (images.length < 6) {
      setImages([...images, { image: {}, h5: '' }]);
    }
  };

  const handleRemoveImage = (index) => { // remove image
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const handleImageUpload = async (index, e) => { // select image from local device
    const file = e.target.files[0];
    const updatedImages = [...images];
    updatedImages[index] = { ...updatedImages[index], image: file };
    setImages(updatedImages);
  }

  const handleSaveImage = async (imageFile) => {  // this function only will actually upload the images into firebase
    try {                                         // and then it will return the URL for the image
      if (!imageFile) return;
      const imageRef = ref(storage, `images/${Date.now()}_${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      const downloadURL = await getDownloadURL(imageRef);
      return downloadURL;
    } catch (e) {
      console.error('Error saving image', e);
    }
  };

  const handleSaveChanges = async () => {
    let formData = {
      Carousel: []
    };

    let imageURL_List = []
    let h5_list = []

    // Create an array of promises for saving images
    const saveImagePromises = images.map(async(item)=>{
        const URL = await handleSaveImage(item.image)
        imageURL_List.push(URL); // push as a URL List
        h5_list.push(item.h5)    // push the h5 headings
    })

    // Wait for all promises to resolve
    await Promise.all(saveImagePromises);

    let m = imageURL_List.length 

    for (let i=0; i<m; i++){  // this loop will add the flyer data in the desired format
                              // of the siteUI.js schema
        formData.Carousel.push({
            imageURL: imageURL_List[i] ,
            h5: h5_list[i]
        })
        console.log(`added ${i}`)
    }

    console.log(formData)
  
    try {
      const response = await axios.patch(`${backendUrl}/display/`, formData, {
        withCredentials: true
      })
                                  .then(alert("Settings saved successfully"));
      console.log('Font settings saved:', response.data);
    } catch (error) {
      console.error('Error saving font settings:', error);
      alert("Error saving settings")
    }
   };



  const handleTextChange = (index, h5) => {
    const updatedImages = images.map((image, i) =>
      i === index ? { ...image, h5 } : image
    );
    setImages(updatedImages);
  };

    // Auto-resize the textarea based on content
    const autoResizeTextarea = (e) => {
        e.target.style.height = "auto"; // Reset height
        e.target.style.height = `${e.target.scrollHeight}px`; // Set height based on content
        };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Add Images for Carousel</h2>
      
      {images.length < 6 && (
        <button
          onClick={handleAddImage}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
        >
          Add Image
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div key={index} className="border p-4 rounded-md relative">
            <div className="flex flex-col space-y-2">
              {/* Placeholder for image upload */}
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center cursor-pointer">
              <input
                    type="file"
                    onChange={(e)=>handleImageUpload(index, e)}
                    className="ml-[50px]"
                  />
              </div>
              {/* Expanding textarea */}
              <textarea
                placeholder="Enter text for the image"
                value={image.h5}
                onChange={(e) => {
                  handleTextChange(index, e.target.value);
                  autoResizeTextarea(e); // Auto-resize textarea
                }}
                rows={1} // Start with one row
                className="border p-2 rounded-md resize-none overflow-hidden"
              />
              {/* Delete button */}
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full"
              >
                &times;
              </button>
            </div>
          </div>
        ))}
            <button onClick={handleSaveChanges} className="btn bg-green-400 my-[20px]">
                Save Changes
            </button>
      </div>
    </div>
  );
};

export default CarouselCenter;
