import React, { useEffect, useState } from 'react'
import { AiFillCloseSquare } from "react-icons/ai";
import axios from 'axios';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../firebase';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AddItemForm = ({propertyFields, pID, features}) => {

    async function getLastPK(ID) {  //get the to be entered primary key of the item (respective to the ProductID)
        const packet = await axios.get(`${backendUrl}/products/nxt-pk/${ID}`, {withCredentials: true})
        const pk = packet.data
        return pk
    }
    const [nextPK, setNext] = useState(0) //State to store the next primary key value

    const isPrice = features[0] // Check if there is a Price field to insert a Price?

    useEffect(() => {
        const fetchNextPK = async () => {
            const pk = await getLastPK(pID);
            setNext(pk);
          };
      
          fetchNextPK();
    },[pID])

    const [isOpen, setIsOpen] = useState(false);  //State to toggle the form open/close

    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

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
    

    const Savefunction = async () => {

        const imageURL = await handleFileUpload(image);

        const formData = {};   //create a FormData object

        const tileData = {}
        propertyFields.map((prop) => {
            tileData[prop] = document.getElementById(prop).value
        })
        formData['props'] = JSON.stringify(tileData) //Insert the field inputs

        formData['PK_n'] = JSON.stringify(nextPK)    //The primary key number value. calculated using the nexPK prop which was drilled using function getLastPK ()

        formData['ProductID'] = pID; //Track the Product ID number accurately

        formData['images'] = [imageURL] //Insert the image URL

        if (isPrice === 1) {
            const price = document.getElementById("price")
            formData['price'] = price ? price.value : null //Insert the price if available
        }

        axios.post(`${backendUrl}/products`, formData, {withCredentials: true})
             .then(() => {
                alert("Added New Item")
                location.reload()
             }) 
             .catch((error) => {console.log(error); alert(`Error: ${error}`)})
    }

    return (
    <>
    <div className='w-[200px] h-[300px] bg-gray-300 text-inherit
                    flex items-center justify-center'>
        <button onClick={toggleOpen}>Add New</button>
    </div>


    {isOpen && (
      <>
        <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
        <div className='z-20 fixed inset-0 flex flex-col
                        h-[500px] w-[900px] bg-gray-200 
                        mx-[auto] my-[auto]
                        rounded-[4px]'>
            <button className='mx-[0.5px] self-end' onClick={toggleOpen}><AiFillCloseSquare className='text-4xl'/></button>
            <div className='self-center mb-4'><h1 className='font-inter font-extrabold text-2xl'>Add New Item</h1></div>
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
                            className="self-center file-input file-input-bordered file-input-info w-full max-w-xs" 
                            accept='image/*'
                            onChange={(e)=>setImage(e.target.files[0])}/>
                    
                    <div className='self-start pl-20 mt-4'>
                        {/* <ul>
                            {images.map((file, index) => (
                                <div>
                                    <p>{file.name}</p>
                                </div>
                            ))}
                        </ul> */}

                    </div>

                    {isPrice === 1 && 
                    <input id="price" type="text" placeholder="LKR 100.00" className="self-center input border-0 rounded-[2px] w-full max-w-xs max-h-[36px]" />
                    }
                    <button className="self-center btn m-4" onClick={Savefunction}>Finish & Save</button>            
                </div>
            </div>  
        </div>
      </>
    )}
    </>
    )
}

export default AddItemForm