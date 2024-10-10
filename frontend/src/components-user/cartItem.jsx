// import React, {useState, useEffect} from 'react'
// import { useDispatch } from 'react-redux';
// import { addToCart, removeFromCart } from '../stores/cart';


// const cartItem = (props) => {

//     const {productId, image, quantity, title, price} = props.data;

//     const dispatch = useDispatch();

//     const handleReduceQuantity = () => {
//         dispatch(removeFromCart({
//             productId: productId,
//             quantity: 1,
//         }))
//     }

//     const handleIncreaseQuantity = () => {
//         dispatch(addToCart({
//             productId: productId,
//             quantity: 1,
//             title: title,
//             price: price,
//             image: image
//         }))
//     }

//     return (
//         <div>
//             <div className='flex justify-between items-center bg-slate-600 text-white p-2 border-slate-700 gap-5'>
//                 <img src={image} alt={`${image}`} className='w-12'></img>
//                 <h3>{title}</h3>
//                 <div className='w-20 flex justify-between gap-2'>
//                     <button className='bg-gray-200 rounded-full w-6 h-6 text-cyan-600' onClick={handleReduceQuantity}>-</button>
//                     <span>{quantity}</span>
//                     <button className='bg-gray-200 rounded-full w-6 h-6 text-cyan-600' onClick={handleIncreaseQuantity}>+</button>
//                 </div>
//                 <p>{price * quantity}</p>
//             </div>
//         </div>
//     )
// }

// export default cartItem

import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../stores/cart';

const CartItem = (props) => {
    const { productId, image, quantity, title, price } = props.data;
    const dispatch = useDispatch();

    const handleReduceQuantity = () => {
        dispatch(removeFromCart({
            productId: productId,
            quantity: 1,
        }));
    };

    const handleIncreaseQuantity = () => {
        dispatch(addToCart({
            productId: productId,
            quantity: 1,
            title: title,
            price: price,
            image: image,
        }));
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-lg rounded-lg p-4 border border-gray-300 space-y-4 sm:space-y-0 sm:space-x-4">
            <img src={image} alt={title} className="w-24 h-24 object-cover rounded-md sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" />
            <div className="flex-grow text-center sm:text-left">
                <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
                <p className="text-gray-500 mt-1">${price.toFixed(2)} each</p>
            </div>
            <div className="flex items-center justify-center space-x-2 sm:space-x-4">
                <button 
                    className="bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center focus:outline-none"
                    onClick={handleReduceQuantity}
                >
                    -
                </button>
                <span className="text-lg font-medium">{quantity}</span>
                <button 
                    className="bg-green-500 hover:bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center focus:outline-none"
                    onClick={handleIncreaseQuantity}
                >
                    +
                </button>
            </div>
            <p className="font-semibold text-lg text-gray-800 mt-2 sm:mt-0 text-center sm:text-left">${(price * quantity).toFixed(2)}</p>
        </div>
    );
}

export default CartItem;
