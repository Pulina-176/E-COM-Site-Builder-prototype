import React, { useState , useEffect, useCallback } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Spinner from '../components/Spinner'
import {Link} from 'react-router-dom'
import { AiTwotoneDelete } from "react-icons/ai";
import { AiTwotoneEdit } from "react-icons/ai";

const backendUrl = import.meta.env.VITE_BACKEND_URL;


const ViewCommodity = () => {

    const navbarList = ["Home", "Products", "Services", "Contact Us"]  //Navbar
    const [loading, setLoading] = useState(true); // State to handle the loading status

    const [Products, setProducts] = useState()    //Object that holds all different Product Commodities (structures)
    const [Services, setServices] = useState()    //Object that holds all different Services Commodities (structures)

    function delete_com(id) {
        axios.delete(`${backendUrl}/custom-p-com/${id}`)
             .then(alert("Successfully deleted Product ", id));
        location.reload()
    }

    function delete_com_2(id) {
        axios.delete(`${backendUrl}/custom-s-com/${id}`)
             .then(alert("Successfully deleted Service ", id));
        location.reload()
    }

    const fetchData = useCallback(async () => {
        try{
            const response = await axios.get(`${backendUrl}/custom-p-com`)
                                        .then(console.log('Products fetch success'))
                                        .catch((err)=>console.error(err));
            setProducts(response)

            const response2 = await axios.get(`${backendUrl}/custom-s-com`)
                                         .then(console.log('Services fetch success'))
                                         .catch((err)=>console.error(err));
            setServices(response2)
        }
        catch(error){
            console.error(error)
            return (<>
                <div>Error Fetching Data : </div>
                <div>{error}</div>
                </>)
        }
        finally{
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchData();
      }, [fetchData]);

    // Render a loading message if data is still being fetched
    if (loading) {
        return (<div className='ml-[350px] mt-[300px]'>
            <Spinner></Spinner>
        </div>);
    }

    return (<>
    <div class='container'>
        <Navbar pages={navbarList}></Navbar>

        <div className='flex flex-row align-center'>
            <h1 className='font-poppins font-extrabold text-4xl ml-[60px] my-[30px]'>View Commodities</h1>
        </div>

        <div className='flex flex-col items-center mx-[100px]'>
            <div className='mb-[100px] w-full bg-white border border-gray-600 rounded-lg overflow-hidden'>
                <table className='font-inter w-full'>
                    <thead>
                        <tr className='border-b border-gray-600 text-center font-bold bg-purple-300'>
                        <td className='py-2 px-4 w-[15%] '>Product ID</td>
                            <td className='py-2 px-4 w-[15%]'>GroupName</td>
                            <td className='py-2 px-4 w-[40%]'>Fields</td>
                            <td className='py-2 px-4 w-[15%]'>Feature Code</td>
                            <td className='py-2 px-4 w-[15%]'>Operations</td>
                        </tr>
                    </thead>
                    <tbody>
                        {Products.data.map((item, i) => (
                        <tr key={i} className='border-b border-gray-600 h-[40px] hover:bg-gray-100 text-center'>
                            <td>{item.ProductID}</td>
                            <td>{item.GroupName}</td>
                            <td>{Object.keys(item.Field_info).map((i)=>(
                                <> {i},</>
                            ))}</td>
                            <td>{item.Feature_string}</td>
                            <td className='flex justify-center gap-[20px] mt-[11px]'>
                                <button onClick={()=>document.getElementById(`delete_com_${i}`).showModal()}><AiTwotoneDelete/></button>
                                {/* The following modal component is  
                                    added directly from daisyui.com; 
                                    link:-['https://daisyui.com/components/modal/'] */}
                                <dialog id={`delete_com_${i}`} className="modal">  
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg">Warning!</h3>
                                        <p className="pt-4">Are you sure you want to delete this commodity?</p>
                                        <p className="py-0">All items related to it will be lost</p>
                                        <p className="py-4">Press ESC key or click the Cancel button below to cancel</p>
                                        <div className="modal-action">
                                        <button className='btn bg-red-100' onClick={()=>delete_com(item.ProductID)}>Delete</button>
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn bg-green-100">Cancel</button>
                                        </form>
                                        </div>
                                    </div>
                                </dialog>
                                <Link to={`/admin/upcom/Product/${item.ProductID}`}><button><AiTwotoneEdit/></button></Link>
                            </td>
                        </tr>
                        ))}
                        <tr className='h-[40px] hover:bg-indigo-100 text-center'>
                            <td></td>
                            <td></td>
                            <td><button className='btn btn-sm btn-accent font-inter'><Link to="/admin/addcom">Add New</Link></button></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='mb-[100px] w-full bg-white border border-gray-600 rounded-lg overflow-hidden'>
                <table className='font-inter w-full'>
                    <thead>
                        <tr className='border-b border-gray-600 text-center font-bold bg-purple-300'>
                        <td className='py-2 px-4 w-[15%] '>Service ID</td>
                            <td className='py-2 px-4 w-[15%]'>GroupName</td>
                            <td className='py-2 px-4 w-[40%]'>Fields</td>
                            <td className='py-2 px-4 w-[15%]'>Feature Code</td>
                            <td className='py-2 px-4 w-[15%]'>Operations</td>
                        </tr>
                    </thead>
                    <tbody>
                        {Services.data.map((item, i) => (
                        <tr key={i} className='border-b border-gray-600 h-[40px] hover:bg-gray-100 text-center'>
                            <td>{item.ServiceID}</td>
                            <td>{item.GroupName}</td>
                            <td>{Object.keys(item.Field_info).map((i)=>(
                                <> {i},</>
                            ))}</td>
                            <td>{item.Feature_string}</td>
                            <td className='flex justify-center gap-[20px] mt-[11px]'>
                                <button onClick={()=>document.getElementById(`delete_com_2${i}`).showModal()}><AiTwotoneDelete/></button>
                                {/* The following modal component is  
                                    added directly from daisyui.com; 
                                    link:-['https://daisyui.com/components/modal/'] */}
                                <dialog id={`delete_com_2${i}`} className="modal">  
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg">Warning!</h3>
                                        <p className="pt-4">Are you sure you want to delete this commodity?</p>
                                        <p className="py-0">All items related to it will be lost</p>
                                        <p className="py-4">Press ESC key or click the Cancel button below to cancel</p>
                                        <div className="modal-action">
                                        <button className='btn bg-red-100' onClick={()=>delete_com_2(item.ServiceID)}>Delete</button>
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn bg-green-100">Cancel</button>
                                        </form>
                                        </div>
                                    </div>
                                </dialog>
                                <Link to={`/admin/upcom/Service/${item.ServiceID}`}><button><AiTwotoneEdit/></button></Link>
                            </td>
                        </tr>
                        ))}
                        <tr className='h-[40px] hover:bg-indigo-100 text-center'>
                            <td></td>
                            <td></td>
                            <td><button className='btn btn-sm btn-accent font-inter'><Link to="/admin/addcom">Add New</Link></button></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        {/* <button className='btn btn-accent' onClick={getProducts2}>Test</button> */}

    </div>    
    </>)
    }

export default ViewCommodity