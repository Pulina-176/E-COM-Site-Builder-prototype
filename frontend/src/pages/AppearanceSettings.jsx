import React from 'react'
import Navbar from '../components/Navbar'
import DropDown3 from '../components/DropDown3'
import {Link} from 'react-router-dom'
import PopupBox_Navbar_color_image from '../components/visualservice/Navbar-color-image'
import Landing_customize from '../components/visualservice/Landing-customize'

const AppearanceSettings = () => {
    const list = ["Home", "Products", "Services", "Contact Us"]

    return (
        <div class="container">
            <Navbar pages={list}></Navbar>
            <h1 className='font-inter font-extrabold text-4xl ml-[60px] my-[30px]'>Admin Settings</h1>
            <div className='flex flex-col'>
                <div className='w-[60%] h-[150px] bg-[#F0F3FF] ml-[60px] rounded-[10px] flex flex-row justify-center items-center'>
                    <label className='mx-[20px] flex flex-col items-center'>
                        <div className='w-[100px] h-[15px] bg-orange-300' onClick={() => console.log("clicked")}></div>
                        <p className='mt-[10px] justify-center'>Main Body</p>
                    </label>
                    <label className='mx-[20px] flex flex-col items-center'>
                        <div className='w-[100px] h-[15px] bg-violet-300' onClick={() => console.log("clicked")}></div>
                        <p className='mt-[10px] justify-center'>Main Headings</p>
                    </label>
                    <label className='mx-[20px] flex flex-col items-center'>
                        <div className='w-[100px] h-[15px] bg-indigo-700' onClick={() => console.log("clicked")}></div>
                        <p className='mt-[10px] justify-center'>Sub Headings</p>
                    </label>
                    <label className='mx-[20px] flex flex-col items-center'>
                        <div className='w-[100px] h-[15px] bg-pink-500' onClick={() => console.log("clicked")}></div>
                        <p className='mt-[10px] justify-center'>Button theme</p>
                    </label>
                    <label className='mx-[20px] flex flex-col items-center'>
                        <div className='w-[100px] h-[15px] bg-green-700' onClick={() => console.log("clicked")}></div>
                        <p className='mt-[10px] justify-center'>Font Color</p>
                    </label>
                </div>

                <div className='w-[40%] my-[40px] h-[auto] bg-[#F0F3FF] ml-[60px] rounded-[10px] flex flex-col'>
                    <p className='font-inter text-xl font-semibold mx-[40px] mt-[20px]'>Site Outlook</p>
                    <div className='flex flex-col mb-[10px]'>
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
                    </div>

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
            
            </div>
        </div>
    )
}

export default AppearanceSettings



const themes = {
    modernMinimalist: {
      backgroundColor: "#FFFFFF",
      productTileColor: "#F8F8F8",
      buttonColor: "#007BFF",
      textColor: "#333333",
    },
    warmInviting: {
      backgroundColor: "#FDFDFD",
      productTileColor: "#FFF7E6",
      buttonColor: "#FF5733",
      textColor: "#4B4B4B",
    },
    boldDynamic: {
      backgroundColor: "#F5F5F5",
      productTileColor: "#FFFFFF",
      buttonColor: "#FF4500",
      textColor: "#000000",
    },
    elegantSophisticated: {
      backgroundColor: "#FAFAFA",
      productTileColor: "#F2F2F2",
      buttonColor: "#5A5A5A",
      textColor: "#212121",
    },
  };