import React from 'react'
import Navbar from '../components/Navbar'
import DropDown3 from '../components/DropDown3'
import PopupBox_Navbar_color_image from '../components/visualservice/Navbar-color-image'
import Landing_customize from '../components/visualservice/Landing-customize'
import { themes } from '../config/colorthemes'
import { useState } from 'react'
import axios from 'axios'
import CarouselCenter from '../components/visualservice/Carousel-terminal'

const backendUrl = import.meta.env.VITE_BACKEND_URL;


const AppearanceSettings = () => {
    const list = ["Home", "Products", "Services", "Contact Us"] 

    const themeList = Object.keys(themes);
    console.log(themeList)

    const [newTheme, setNewTheme] = useState("default");

    const handleChangeTheme = (themeName) => {
        setNewTheme(themeName);
    };

    const saveTheme = async() => {

        const formData = {
            colortheme: newTheme
        }

        console.log(formData.colortheme)

        const response = await axios.patch(`${backendUrl}/display/`, formData)
                                    .then((res)=>{alert("Theme saved successfully"); console.log(res)})
                                    .catch((err)=>{console.log("Error saving theme",err); alert("Error saving theme")})
    }

    return (
        <div class="container">
            <Navbar pages={list}></Navbar>
            <h1 className='font-inter font-extrabold text-4xl ml-[60px] my-[30px]'>Admin Settings</h1>
            <div className='flex flex-col'>
                <div className='w-[20%] h-[150px] bg-[#F0F3FF] ml-[60px] rounded-[10px] flex flex-col align-center'>
                    <p className='font-inter text-xl font-semibold mx-[40px] mt-[20px]'>Theme Setting</p>
                    <div className='flex flex-row mt-[20px] ml-[50px] gap-8'>
                        <DropDown3 values={themeList} setComType={handleChangeTheme}></DropDown3>
                        <button className='btn btn-sm btn-accent text-white px-[20px] rounded-[5px]' onClick={saveTheme}>Save</button>
                    </div> 
                </div>

            <div className='flex flex-row'>
                <div className='w-[40%] my-[40px] h-[auto] bg-[#F0F3FF] ml-[60px] rounded-[10px] flex flex-col'>
                    <p className='font-inter text-xl font-semibold mx-[40px] mt-[20px]'>Site Outlook</p>
                    {/* <div className='flex flex-col mb-[10px]'>
                        <p className='font-inter text-lg mx-[40px] mt-[20px]'>Block styles</p>
                        <hr className='mx-[40px] border-t-1 border-black mb-[20px]'></hr>
                        <div className='flex flex-row'>
                            <p className='mx-[50px]'>Corners</p>
                            <DropDown3 values={["Sharp", "Rounded"]} setComType={(str) => console.log(str)}></DropDown3>
                        </div>
                        <div className='flex flex-row'>
                            <p className='mx-[50px]'>Material</p>
                            <DropDown3 values={["Solid", "Glass"]} setComType={(str) => console.log(str)}></DropDown3>
                        </div>
                    </div> */}

                    <div className='flex flex-col mb-[10px]'>
                        <p className='font-inter text-lg mx-[40px] mt-[20px]'>Header and Nav Bar</p>
                        <hr className='mx-[40px] border-t-1 border-black mb-[15px]'></hr>
                        <div className='flex flex-col mx-[40px]'>
                            <p className="my-[5px] w-[40%] self-start">Landing Page</p>
                            <Landing_customize/>
                            <p className="my-[5px] w-[40%] self-start">Other Pages</p>
                            <PopupBox_Navbar_color_image/>
                        </div>
                    </div>

                </div>

                <div className='w-[50%] my-[40px] h-[auto] bg-[#F0F3FF] ml-[60px] rounded-[10px] flex flex-col'>
                        <div className='flex flex-col mb-[10px]'>
                            <p className='font-inter text-lg mx-[40px] mt-[20px]'>Landing Page Carousel</p>
                            <hr className='mx-[40px] border-t-1 border-black mb-[15px]'></hr>
                            <div className='flex flex-col mx-[40px]'>
                                <CarouselCenter></CarouselCenter>
                            </div>
                        </div>
                </div>
            
            </div>
            </div>
        </div>
    )
}

export default AppearanceSettings



// const themes = {
//     modernMinimalist: {
//       backgroundColor: "#FFFFFF",
//       productTileColor: "#F8F8F8",
//       buttonColor: "#007BFF",
//       textColor: "#333333",
//     },
//     warmInviting: {
//       backgroundColor: "#FDFDFD",
//       productTileColor: "#FFF7E6",
//       buttonColor: "#FF5733",
//       textColor: "#4B4B4B",
//     },
//     boldDynamic: {
//       backgroundColor: "#F5F5F5",
//       productTileColor: "#FFFFFF",
//       buttonColor: "#FF4500",
//       textColor: "#000000",
//     },
//     elegantSophisticated: {
//       backgroundColor: "#FAFAFA",
//       productTileColor: "#F2F2F2",
//       buttonColor: "#5A5A5A",
//       textColor: "#212121",
//     },
//   };