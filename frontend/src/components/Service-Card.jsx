import React ,{ useContext } from 'react'
import axios from 'axios'
import UpdateItemForm from './UpdateItemForm'
import { PropContext } from './PropContext'

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ServiceCard = ({tileprops, serviceData, index, features}) => {

  const {allProps, sIDList} = useContext(PropContext)

  const pk = serviceData["PK_n"]  //primary key

  const img_paths = serviceData["images"] //array of image paths

  const Delete = () => {
    const PID= serviceData["ServiceID"]
    axios.delete(`${backendUrl}/services/${PID}/${pk}`, {withCredentials: true})  
    location.reload();

    console.log(serviceData)
}

  return (
    <div className='card relative group shadow-xl'>
        <div className='w-[400px] h-[250px] bg-gray-300'
              style = {{ backgroundImage: `url('${img_paths[0]}')`,
                         backgroundSize: 'cover', 
                         backgroundPosition: 'center' }}
        ></div>
        {tileprops.map((value,index)=>(
        <div 
            key={index}
            className={`w-[400px] h-[auto] pt-[4px] pb-[0px] px-[15px] bg-gray-100 ' ${index === 0 ? 'font-bold text-[17px] pb-[0px]' : 'pb-[2px]'}`}
        >
            {serviceData.props[value]}
        </div>
        ))}
        <div className='w-[400px] h-[auto] pt-[4px] pb-[10px] px-[8px] bg-gray-100 custom-html'> 
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
            <UpdateItemForm propertyFields={allProps[index]} ID={sIDList[index]} pK={pk} comType="Service" features={features}/>
            <button className="bg-red-500 text-white px-4 py-2" onClick={Delete}>Delete</button>
        </div>
    </div>
  )
}

export default ServiceCard