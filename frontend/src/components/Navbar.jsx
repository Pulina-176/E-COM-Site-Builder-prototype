import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const frontend = import.meta.env.VITE_FRONTEND_URL;

const Navbar = ({pages}) => {//need to pass the hyperlink (address to page) as well in props   **Not currently in use. Navigation options are hardcoded

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
          className='flex flex-col justify-center items-center px-4 py-4 md:py-0 
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
        <div
          className='flex-col items-center gap-4 py-4 px-4 md:gap-0 md:py-0 rounded-lg px
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
                
              
                <p><a href={`${frontend}/admin/`}>Home</a></p>
                <p><a href={`${frontend}/admin/products`}>Products</a></p>
                <p><a href={`${frontend}/admin/services`}>Services</a></p>
                <p><a href={`${frontend}/admin-auth`}>Log Out</a></p>
              
                
            </div>
        </div>

    </div>
  )
}

Navbar.propTypes = {
  props: PropTypes.arrayOf(PropTypes.string), //the hyperlinks for the pages in the navigation bar 
}

export default Navbar