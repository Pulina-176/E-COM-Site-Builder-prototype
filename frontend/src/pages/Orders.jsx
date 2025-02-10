import React, { useEffect , useState } from 'react'
import Navbar from '../components/Navbar'

const navbarList = ["Home", "Bookings", "Services", "Contact Us"];  // No need this actually
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Orders = () => {

    const [orders, setOrders] = useState([]);

    // Fetch orders from backend
    useEffect(() => {
        fetch(`${backendUrl}/order`, {
            method: 'GET',
            credentials: 'include' // This sends cookies with the request
        })
        .then(response => response.json())
        .then(data => setOrders(data))
        .catch(err => console.error('Error fetching orders: ', err));

        console.log(orders)

    }, [])


  return (
    <div>
        <Navbar pages={navbarList} />

        <div className='flex flex-row align-center'>
          <h1 className='font-poppins font-extrabold text-4xl ml-[60px] my-[30px]'>Online Orders</h1>
        </div>

        <div className='flex flex-col items-center mx-[100px]'>
            <div className='mb-[100px] w-full bg-white border border-gray-600 rounded-lg overflow-hidden'>
            <table className='font-inter w-full'>
                <thead>
                    <tr className='bg-gray-100 text-center'>
                        <td className='py-2 px-4 w-[20%]'>Customer Email</td>
                        <td className='py-2 px-4 w-[20%]'>Order Date</td>
                        <td className='py-2 px-4 w-[20%]'>Order Time</td>
                        <td className='py-2 px-4 w-[20%]'>Contact No</td>
                        <td className='py-2 px-4 w-[20%]'>Address</td>
                        <td className='py-2 px-4 w-[20%]'>ZipCode</td>
                        <td className='py-2 px-4 w-[10%]'></td>
                        
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index} className='border-b border-gray-600 h-[40px] hover:bg-gray-100 text-center'>
                            <td className='py-2 px-4'>{order.Email}</td>
                            <td className='py-2 px-4'>{order.Ordered_date.split('T')[0]}</td>
                            <td className='py-2 px-4'>{order.Ordered_date.split('T')[1].split('.')[0]}</td>
                            <td className='py-2 px-4'>{order.ContactNo}</td>
                            <td className='py-2 px-4'>{order.Address}</td>
                            <td className='py-2 px-4'>{order.Zipcode}</td>
                            <td className='py-2 px-4'>
                                <button onClick={() => document.getElementById(`info_modal_${index}`).showModal()} className='bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600'>
                                    Info
                                </button>

                                {/* Modal for show order information */}
                            <dialog id={`info_modal_${index}`} className="modal">
                                <div className="modal-box p-6">
                                    <h3 className="font-bold text-xl text-center">Order Details</h3>

                                    <div className="mt-4">
                                        <table className="w-full border-collapse">
                                            <thead>
                                                <tr className="bg-gray-100">
                                                    <th className="text-left p-2">Product</th>
                                                    <th className="text-center p-2">Qty</th>
                                                    <th className="text-center p-2">Price</th>
                                                    <th className="text-center p-2">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.Order.map((item, i) => {
                                                    const parsedItem = JSON.parse(item);
                                                    return (
                                                        <tr key={i} className="border-t">
                                                            <td className="p-2">{parsedItem.Product}</td>
                                                            <td className="p-2 text-center">{parsedItem.Quantity}</td>
                                                            <td className="p-2 text-center">LKR {parsedItem.Price}</td>
                                                            <td className="p-2 text-center font-bold">LKR {parsedItem.Total}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Total Amount */}
                                    <div className="mt-6 text-right">
                                        <p className="text-lg font-semibold">Total Paid: <span className="text-green-600">LKR {order.Total_payed}</span></p>
                                    </div>

                                    {/* Modal Actions */}
                                    <div className="modal-action">
                                        <form method="dialog">
                                            <button className="btn bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-all">
                                                OK
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
        </div>

        
    </div>
  )
}

export default Orders