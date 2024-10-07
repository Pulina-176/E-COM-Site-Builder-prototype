import React, {useState, useEffect} from 'react'

const cartItem = (props) => {

    const {productId, quantity, title, price} = props.data;
    const [detail, setDetail] = useState([]);



    return (
        <div className='flex justify-between items-center bg-slate-600 text-white p-2 border-slate-700 gap-5'>
            <img src={} alt="" className='w-12'></img>
            <h3>{}</h3>
            <p></p>
            <div className='w-20 flex justify-between gap-2'>
                <button className='bg-gray-200 rounded-full w-6 h-6 text-cyan-600'>-</button>
                <span>{}</span>
                <button className='bg-gray-200 rounded-full w-6 h-6 text-cyan-600'>+</button>
            </div>
        </div>
    )
}

export default cartItem