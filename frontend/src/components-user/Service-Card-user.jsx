import React from 'react'
import axios from 'axios'

const ServiceCard_user = ({tileprops, serviceData, index}) => {

  const img_paths = serviceData["images"] //array of image paths

  return (
    <div className='relative group mb-5'>
        <div className='w-[400px] h-[250px] bg-gray-300'
              style = {{ backgroundImage: `url('${img_paths[0]}')`,
                         backgroundSize: 'cover', 
                         backgroundPosition: 'center' }}
        ></div>
        {tileprops.map((value,index)=>(
        <div className='w-[400px] h-[auto] pt-[4px] pb-[0px] px-[8px] bg-gray-100'>{serviceData.props[value]}</div>
        ))}
        <div className='w-[400px] h-[auto] pt-[4px] pb-[0px] px-[8px] bg-gray-100 custom-html'> 
          <div dangerouslySetInnerHTML={{ __html: serviceData.Mini_Description }} />
          <style jsx>{`
        .custom-html ul {
          list-style-type: disc;
          margin-left: 20px;
          padding-left: 20px;
        }
        .custom-html p {
          margin-bottom: 2px;
          margin-top: 3px;
          color: #333;
        }
        .custom-html li {
          margin-bottom: 5px;
          color: #555;
        }
      `}</style>
        </div>
        <div className="absolute top-0 right-0 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-red-500 text-white px-4 py-2">Book</button>
        </div>

    </div>
  )
}

export default ServiceCard_user