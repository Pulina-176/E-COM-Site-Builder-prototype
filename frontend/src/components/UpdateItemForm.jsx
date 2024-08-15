import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiFillCloseSquare } from "react-icons/ai";
import RichTextEditor from './RichTextEditor';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../firebase';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const UpdateItemForm = ({propertyFields, ID, pK, comType, features}) => {

    const [isMiniDes, setMiniDes] = useState(false); //Rich Text Editor visible/not-visible - Depends on the 5th number in the feature string
    //This is a feature only for service type commodities
    const [desc, setDesc] = useState(``);  //minidescription initial text at loading if available - (temporary)

    const isPrice = features[0] // Check if there is a Price field to insert a Price?


    let getANDpatchURL;  //same URL is used within this component to fetch and patch data
    switch(comType){
      case "Product":
        getANDpatchURL=`${backendUrl}/products/${ID}/${pK}`
        break
      case "Service":
        getANDpatchURL=`${backendUrl}/services/${ID}/${pK}`
        break
    }
    
    const [isOpen, setIsOpen] = useState(false);  //Update information form visible/not-visible
    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }
    
    useEffect(() => {

        // setMiniDescription(ID);

        const fetchData = async () => { //load existing data from database into the textboxes 
            console.log(getANDpatchURL)
            console.log(comType)

            if (isOpen) {
                try {
                  const packet = await axios.get(getANDpatchURL);
                  console.log(packet.data[0]['props']);
                  const prop_vals = packet.data[0]['props'];
                  
                  propertyFields.forEach((prop) => {
                    document.getElementById(prop).value = prop_vals[prop];
                  });
        
        
                  if (comType === "Service") {  //if "service" sometimes can exist mini description
                    const descVal = packet.data[0]['Mini_Description'];
                    setDesc(descVal);

                    const featurePacket = await axios.get(`${backendUrl}/custom-s-com/${ID}`);
                    const fs = featurePacket.data;
                    console.log(fs[0].Feature_string[4]);
                    setMiniDes(fs[0].Feature_string[4]);
                  }
        
                } catch (error) {
                  console.error("Error fetching data:", error);
                }
              }  
        };
        fetchData();
    }, [isOpen, ID, pK]);

    const [image, setImage] = useState(undefined) // Image file to be uploaded
    const [imagePercent, setImagePercent] = useState(0) //Image upload progress

    const handleFileUpload = async (image) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + '-' + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);
    
        return new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImagePercent(Math.round(progress));
                },
                (error) => {
                    console.error(error);
                    alert("Error uploading image", error);
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL); // Resolve the promise with the download URL
                    });
                }
            );
        });
    };

    const [description, setDescription] = useState("") //Rich Text Editor value (state to track current changes in editor)

    function getDescriptionText(text) {  //Rich Text Editor onType prop function
        setDescription(text)
    }

    const updateFunction = async () => {

        const imageURL = await handleFileUpload(image);

        const formData = {};   //create a FormData object

        const tileData = {}
        propertyFields.map((prop) => {
            tileData[prop] = document.getElementById(prop).value
        })
        formData['props'] = JSON.stringify(tileData) //Insert the field inputs

        formData['images'] = [imageURL] //Insert the image URL

        if(comType === "Service"){
            formData['Mini_Description'] = description
        }

        axios.patch(getANDpatchURL, formData)   
             .then(() => {
                    alert("Updated item")
                    location.reload()
                })
             .catch((error) => {console.log(error); alert(`Error: ${error}`)})      
          
    }


    return (
        <>
            <button className="bg-blue-500 text-white px-4 py-2" onClick={toggleOpen}>Update</button>

            {isOpen && (
            <div className='absolute top-0 left-0'>
            <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
            <div className='z-20 fixed inset-0 flex flex-col
                            h-[500px] w-[900px] bg-gray-200 
                            mx-[auto] my-[auto]
                            rounded-[4px]'>
                <button className='mx-[0.5px] self-end' onClick={toggleOpen}><AiFillCloseSquare className='text-4xl'/></button>
                <div className='self-center mb-4'><h1 className='font-inter font-extrabold text-2xl'>Update Item details</h1></div>
                <div className='flex flex-row'>
                    <div className='flex flex-col w-[50%]'>
                    {propertyFields.map((prop, index) => (
                        <div key={index} className='w-full mx-8 mb-4 flex'>
                            <label className='flex items-center space-x-4 w-full max-w-[500px]'>
                                <p className='mx-[10px] flex-shrink-0 w-[30%]'> {prop} </p>
                                <input id={prop} type="text" placeholder="Type here" className="input border-0 rounded-[2px] w-full max-w-[250px] max-h-[36px]" />
                            </label>
                        </div>
                    ))}
                    </div>
                    <div className='w-[50%] flex flex-col h-[auto] justify-start'>
                        <input type="file" 
                                className="self-center mb-[10px] file-input file-input-bordered file-input-info w-full max-w-xs" 
                                accept='image/*'
                                onChange={(e)=>setImage(e.target.files[0])}/>
                        {/* {images.length > 0 && (
                        <div className='self-start pl-20 mt-4'>
                            <ul>
                                {images.map((file, index) => (
                                    <div>
                                        <p>{file.name}</p>
                                    </div>
                                ))}
                            </ul>

                        </div>
                    )}  */}
                    {isPrice === 1 && 
                    <input id="price" type="text" placeholder="LKR 100.00" className="self-center input border-0 rounded-[2px] w-full max-w-xs max-h-[36px]" />
                    }
                    {(isMiniDes? <div className='mx-16 my-8 bg-gray-100'><RichTextEditor initialValue={`${desc}`} onType={getDescriptionText} /></div> : <></>)}
                    <button className="self-center btn m-4" onClick={updateFunction}>Finish & Save</button>            
                    </div>
            </div>  
            </div>
            </div>
             )}
        </>
    )
}

export default UpdateItemForm