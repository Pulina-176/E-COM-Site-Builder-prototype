import React, {useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Carousel from '../components-user/Carousel';
import Spinner from '../components/Spinner';
import Footer from '../components-user/Footer';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Landing_Page_User = () => {

  const pageBgColor = '#EEEEEE' 

  const [images, setImages] = useState([]);  // images passed down to Carousel component

  const [loading, setLoading] = useState(true); // State to handle the loading status

  useEffect(() => {
    const fetchCarouselData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/display`);
            setImages(response.data.Carousel);
        } catch (error) {
            console.error('Error fetching carousel data:', error);
        } finally {
            setLoading(false);
            console.log(images)
        }
    };

    fetchCarouselData();
}, []);


  let navigate = useNavigate();

  const [bg, setBg] = useState('#111111'); //state to store the background color or image URL of the navbar
  const [isImage, setIsImage] = useState(false); //state to determine if bg is color or image

  const [businessTitle, setbusinessTitle] = useState('<p> Welcome to our site! </p>');
  const [businessDescription, setbusinessDescription] = useState('<p>Hello There</p>')

  useEffect(() => {
    const fetchStyle = async () => {
      try {
        const response = await axios.get(`${backendUrl}/display/`);
        const data = response.data;
        console.log(data);

        if (data.Landing.color !== null) {
          setBg(data.Landing.color);
          setIsImage(false);
        } else if (data.Landing.imageURL) {
          setBg(data.Landing.imageURL);
          setIsImage(true);
        } else {
          setBg('#110011');
          setIsImage(false);
        }

        if(data.Landing.businessTitle !== null){
          setbusinessTitle(data.Landing.businessTitle);
        }

        if(data.Landing.businessDescription !== null){
          setbusinessDescription(data.Landing.businessDescription)
        }

      } catch (error) {
        console.error('Error fetching styles:', error);
      } 
    };

    fetchStyle();
  }, [bg]);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .ql-align-center { text-align: center; }
      .ql-align-right { text-align: right; }
      .ql-align-justify { text-align: justify; }
      .ql-align-left { text-align: left; }

      .ql-font-serif { font-family: serif; }
      .ql-font-monospace { font-family: monospace; }
      .ql-font-sans-serif { font-family: sans-serif; }
      
      .ql-size-small { font-size: 0.75em; }
      .ql-size-large { font-size: 1.5em; }
      .ql-size-huge { font-size: 2.5em; }

      h1 { font-size: 2em; }
      h2 { font-size: 1.5em; }
      h3 { font-size: 1.17em; }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);


  // For the "Get Started" Button
  const [buttonStyle, setButtonStyle] = useState({
    bgColor: '#000000',
    textColor: '#ffffff',
    hoverBgColor: '#333333'
  }); // Button style



  // Render a loading message if data is still being fetched
  if (loading) {
    return <div><Spinner /></div>;;
  }

  return (
    <div style={{backgroundColor: pageBgColor}}>
    <div className="relative w-full h-[500px] flex justify-center items-center"
         >
        <div
          className='absolute inset-0'
          style={isImage ? 
            { 
              backgroundImage: `url(${bg})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center', 
              borderBottomLeftRadius: '80px',  // Add this
              borderBottomRightRadius: '80px', // Add this
            } : 
            { 
              backgroundColor: bg, 
              borderBottomLeftRadius: '80px',  // Add this
              borderBottomRightRadius: '80px', // Add this
            }
          }
        >
      </div>

      <div className='flex flex-col'>
        <div className="relative z-10 text-center" dangerouslySetInnerHTML={{ __html: businessTitle }} />
        <button className="relative z-11 self-center btn btn-wide bg-black text-white border-none mt-[40px]" 
                style={{
                  backgroundColor: buttonStyle.bgColor,
                  color: buttonStyle.textColor,
                  hover: { backgroundColor: buttonStyle.hoverBgColor },
                }}
                onClick={()=>navigate('/user/products')}>Get Started
            </button>
      </div>

    </div>

    {/* Business Description Section */}
    <div className="flex flex-col mt-[40px]">
      <div className="relative z-10 text-center" dangerouslySetInnerHTML={{ __html: businessDescription }} />
    </div>


    {/* Carousel Section */}
    <div className='my-[100px]'>  
      <Carousel images={images}></Carousel>
    </div>

    {/* Footer Section */}
    <Footer 
      socialLinks={{
        facebook: 'https://facebook.com/yourpage',
        instagram: 'https://instagram.com/yourpage',
        twitter: 'https://twitter.com/yourpage',
      }}
      contactDetails={{
        email: 'info@yourcompany.com',
        phone: '+123 456 7890',
      }}
    />
    
    </div>
  )
}

export default Landing_Page_User