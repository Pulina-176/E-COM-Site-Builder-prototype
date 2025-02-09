import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from '../components-user/cartItem';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; 
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { clearCart } from '../stores/cart';

const Cart = () => {

    const navigate = useNavigate();  // Initialize navigate hook

    const dispatch = useDispatch(); // redux hook


    const carts = useSelector(store => store.cart.items);

    const filteredCarts = carts.map(({ image, ...rest }) => rest);
    console.log(filteredCarts);

    const goToCheckout = () => {
        fetch(`${import.meta.env.VITE_PAYMENT_URL}/stripe-checkout`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                items: filteredCarts
            })
        })
        .then(res => res.json())
        .then(url => {
            location.href = url
        })
    }

    return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                {/* Back to Home button with icon */}
                <button
                    onClick={() => navigate('/')}
                    className="mb-4 flex items-center text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md transition duration-300"
                >
                    <FaArrowLeft className="mr-2" />  {/* Icon positioned before the text */}
                    Back to Home
                </button>
                <h1 className="text-2xl font-bold mb-4 text-center sm:text-3xl lg:text-4xl">Shopping Cart</h1>
                <div className="space-y-4">
                    {carts.length > 0 ? (
                        carts.map((item, index) => (
                            <CartItem key={index} data={item} />
                        ))
                    ) : (
                        <p className="text-center text-lg text-gray-600">Your cart is empty.</p>
                    )}
                </div>
                <div className="mt-8 flex justify-center">
                    <div className="w-full md:w-1/2 lg:w-1/3">
                        <button
                            onClick={goToCheckout}
                            className="w-[45%] text-lg mx-[10px] text-white bg-black hover:bg-gray-400 px-6 py-3 rounded-md transition duration-300"
                        >
                            Proceed to Checkout
                        </button>
                        <button
                            onClick={() => dispatch(clearCart())}
                            className="w-[45%] text-lg mx-[10px] text-white bg-orange-400 hover:bg-gray-400 px-6 py-3 rounded-md transition duration-300"
                        >
                            Empty Cart
                        </button>
                    </div>
                </div>
            </div>
    );
}

export default Cart;
