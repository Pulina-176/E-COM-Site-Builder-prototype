import React, { useEffect, useState } from 'react'
import { AiFillCloseSquare } from "react-icons/ai";
import axios from 'axios';
import RichTextEditor from './RichTextEditor';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AddItemForm_Services = ({propertyFields, sID}) => {

    async function getFeatureString(ID) { //get Feature String
        const packet = await axios.get(`${backendUrl}/custom-s-com/${ID}`) 
        const fs = packet.data
        return fs
    }
    const [isMiniDes, setMiniDes] = useState(false); //Rich Text Editor visible/not-visible - Depends on the 5th number in the feature string

    async function getLastPK(ID) {
        const packet = await axios.get(`${backendUrl}/services/nxt-pk/${ID}`)
        const pk = packet.data
        return pk
    }
    const [nextPK, setNext] = useState(0)  //Set the next PK in the database to the current opened form

    useEffect(() => {
        const fetchNextPK = async () => { //fetch next primary key
            const pk = await getLastPK(sID);
            setNext(pk);
          };

        const fetchisMiniDes = async () => {
            const fs = await getFeatureString(sID);
            console.log(fs[0].Feature_string[4])
            if(fs[0].Feature_string[4]==1){
                setMiniDes(true)
            }
        }
      
          fetchNextPK();
          fetchisMiniDes();
    },[sID])

    const [isOpen, setIsOpen] = useState(false);  //Form visible/not-visible

    const toggleOpen = () => {  //Form visible/not-visible toggle function
        setIsOpen(!isOpen)
        console.log(isMiniDes)
    }

    const [description, setDescription] = useState("") //Rich Text Editor value (temporary save)

    function getDescriptionText(text) {  //Rich Text Editor onType prop function
        setDescription(text)
        console.log(description)
    }

    const saveItem = () => {
        if (images.length > 3) {
            alert('The maximum no. of images for a item is limited to 3 in this update. Please upload 3 or less.')
            setImages([])
            return 0
        } 

        const formData = new FormData();   //create a FormData object

        const tileData = {}
        propertyFields.map((prop) => {
            tileData[prop] = document.getElementById(prop).value
        })
        console.log(JSON.stringify(tileData))
        formData.append('props', JSON.stringify(tileData)) //Insert the field inputs

        formData.append('PK_n', JSON.stringify(nextPK))    //The primary key number value. calculated using the nexPK prop which was drilled using function getLastPK ()

        formData.append('ServiceID', sID); //Track the Product ID number accurately

        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        if(isMiniDes){
            formData.append('Mini_Description', description)
        }

        axios.post(`${backendUrl}/services`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
             .then(() => {
                alert("Added New Item")
                location.reload()
             }) 
             .catch((error) => {console.log(error); alert(`Error: ${error}`)})
    }

    const [images, setImages] = useState([]);  //Images saved in this array temporarily

    const handleFileChanges = (event) => { //For image file uploading (temporary)
        const files = Array.from(event.target.files);
        setImages(files);
    }

    const removeFile = (index) => {  //Remove temporarily uploaded files
        setImages(images.filter((_,ind) => ind !== index))
    }

    useEffect (() => {
        console.log(images)
    }, [images])

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
                            multiple
                            onChange={handleFileChanges}/>
                    {images.length > 0 && (
                    <div className='self-start pl-20 mt-4'>
                        <ul>
                            {images.map((file, index) => (
                                <div>
                                    <p>{file.name}</p>
                                </div>
                            ))}
                        </ul>

                    </div>
                )}          
                </div>
            </div> 
            {(isMiniDes? <div className='mx-16 my-8 bg-gray-100'><RichTextEditor initialValue={"Type your description here"} onType={getDescriptionText} /></div> : <></>)}
            <button className="self-center btn m-4" onClick={saveItem}>Finish & Save</button>   
        </div>
      </>
    )}
    </>
    )
}

export default AddItemForm_Services