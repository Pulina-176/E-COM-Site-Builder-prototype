import React, {useEffect , useState} from 'react'
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Landing_Page_User = () => {

  const [bg, setBg] = useState('#111111'); //state to store the background color or image URL of the navbar
  const [isImage, setIsImage] = useState(false); //state to determine if bg is color or image

  const [businessTitle, setbusinessTitle] = useState('<p> Welcome to our site! </p>');

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

        console.log(businessTitle)

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

  return (
    <div className="relative w-full h-[500px] flex justify-center items-center">
        <div
          className='absolute inset-0'
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
      </div>
      <div className="relative z-10 text-center" dangerouslySetInnerHTML={{ __html: businessTitle }} />

    </div>
  )
}

export default Landing_Page_User