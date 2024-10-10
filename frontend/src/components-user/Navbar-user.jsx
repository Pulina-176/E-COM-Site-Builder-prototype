import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';  
import PropTypes from 'prop-types'
import axios from 'axios';

import { HiOutlineShoppingCart } from "react-icons/hi";


const backendUrl = import.meta.env.VITE_BACKEND_URL;
const frontend = import.meta.env.VITE_FRONTEND_URL;

const Navbar_User = ({pages}) => {//need to pass the hyperlink (address to page) as well in props
                                        //isLanding is a boolean prop to check if landing or not.

   // Use useSelector to get the length of the items array in the cart
   const totalItems = useSelector((state) => state.cart.items.length);

   const [bg, setBg] = useState('#111111'); //state to store the background color or image URL of the navbar
   const [isImage, setIsImage] = useState(false); //state to determine if bg is color or image

   // Styling for navigation bar
    const [fontStyle, setFontStyle] = useState('Inter');
    const [fontSize, setFontSize] = useState('16px');
    const [fontColor, setFontColor] = useState('#1f3050');

   useEffect(() => {
    const fetchStyle = async () => {
      try {
        const response = await axios.get(`${backendUrl}/display/`);
        const data = response.data;
        console.log(data);

        if (data.Other.color !== null) {
          setBg(data.Other.color);
          setIsImage(false);
        } else if (data.Other.imageURL) {
          setBg(data.Other.imageURL);
          setIsImage(true);
        } else {
          setBg('#110011');
          setIsImage(false);
        }

        setFontStyle(data.Other.fontStyle || 'Inter');
        setFontSize(data.Other.fontSize || '16px');
        setFontColor(data.Other.fontColor || '#1f3050');

      } catch (error) {
        console.error('Error fetching styles:', error);
      } 
    };

    fetchStyle();
  }, [bg]);


  return (
    <div>
        <div
          className='flex flex-col justify-center px-4 
                      w-full h-auto  
                      md:flex-row md:content-center md:h-[125px] md:px-10'
          style={isImage ? 
            { 
              backgroundImage: `url(${bg})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center' 
            } : 
            { 
              backgroundColor: bg 
            }
          }
        >

        {/* Navigation Container */}
        <div className='flex 
                        flex-col items-center py-4 gap-4
                        md:flex-row md:w-[100%] md:justify-between md:items-center'>
        

            <div className='md:w-[88px]'>
                {/* Logo */}
            </div>

            <div
              className=' flex-col items-center gap-4 py-4 px-4 md:gap-0 md:py-0 rounded-lg px
                          md:px-8 md:border md:rounded-lg flex md:flex-row md:justify-center md:items-center md:w-[auto] md:h-[44px] md:space-x-16'
              style={{ 
                fontFamily: fontStyle, 
                fontSize: fontSize, 
                color: fontColor, 
                borderColor: fontColor,
                borderWidth: '2px', // Increase border thickness
                backdropFilter: 'blur(4px)', // Add blur effect 
              }}
            >
                  
                  {/* Navigation Links */}
                  <p><a href={`${frontend}`}>Home</a></p>
                  <p><a href={`${frontend}/user/products`}>Products</a></p>
                  <p><a href={`${frontend}/user/services`}>Services</a></p>
                  <p><a href={"#"}>About Us</a></p>
                
                
            </div>

            {/* Cart Icon Container */}
            <div className='flex items-center md:pr-10 p-0' style={{ color: fontColor }}>
              <a href={`${frontend}/cart`}>
              <div
                className='flex justify-center items-center w-12 h-12 rounded-full backdrop-filter backdrop-blur-md bg-white/30 shadow-lg'
                style={{ color: fontColor }}
              >
                <HiOutlineShoppingCart
                  className='cursor-pointer text-3xl hover:text-gray-600 transition duration-300 ease-in-out'
                />
                <span className='absolute top-2/3 right-1/2 bg-red-500 text-white text-sm
                w-5 h-5 rounded-full flex justify-center items-center'>{totalItems}</span>
              </div>
              </a>
            </div>

            </div>

        </div>

    </div>
  )
}

Navbar_User.propTypes = {
  props: PropTypes.arrayOf(PropTypes.string), //the hyperlinks for the pages in the navigation bar 
}

export default Navbar_User