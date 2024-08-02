import React from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../components/Navbar'

const AdminSettings = () => {
  const list = ["Home", "Products", "Services", "Contact Us"]

  return (<>
    <div class="container">
        <Navbar pages={list}></Navbar>
        <h1 className='font-inter font-extrabold text-4xl ml-[60px] my-[30px]'>Admin Settings</h1>
        <div className='flex flex-col'>
          <div className='w-[40%] h-[auto] bg-[#F0F3FF] ml-[60px] rounded-[10px] flex flex-col justify-center'>
            <p className='font-inter text-xl font-semibold mx-[40px] mt-[20px]'>Visual Settings</p>
            <button className="btn btn-secondary mt-[20px] w-[40%] self-center mb-[40px]"><Link to="/admin/visuals">Go to Appearance Settings</Link></button>
          </div>
          <div className='w-[40%] h-[auto] bg-[#F0F3FF] ml-[60px] rounded-[10px] my-[55px] flex flex-col justify-center'>
            <p className='font-inter text-xl font-semibold mx-[40px] mt-[20px]'>Manage Commodities</p>
            <button className="btn btn-primary mt-[20px] w-[40%] self-center"><Link to="/admin/addcom">Add New Commodity</Link></button>
            <button className="btn btn-primary mt-[20px] w-[40%] self-center mb-[40px]"><Link to="/admin/viewcom">Your Commodities</Link></button>
          </div>
        </div>
    </div>
 

</>)
}

export default AdminSettings