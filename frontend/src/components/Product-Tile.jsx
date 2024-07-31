import React, { useContext } from 'react'
import axios from 'axios'
import UpdateItemForm from './UpdateItemForm'
import { PropContext } from './PropContext'

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ProductTile = ({tileprops, productData, index}) => {

    const {allProps, pIDList} = useContext(PropContext)

    const pk = productData["PK_n"]  //primary key

    const img_paths = productData["images"] //array of image paths

    const Delete = () => {
        const PID= productData["ProductID"]
        axios.delete(`${backendUrl}/products/${PID}/${pk}`)  //uncomment this to enable delete
        location.reload();

        console.log(productData)
    }

    return (
    <div className='relative group'>
        <div className='w-[300px] h-[300px] bg-gray-300'
              style = {{ backgroundImage: `url('/images/${img_paths[0]}')`, 
                         backgroundSize: 'cover', 
                         backgroundPosition: 'center' }}
        ></div>
        {tileprops.map((value,index)=>(
        <div className='w-[300px] h-[auto] pt-[4px] pb-[0px] px-[8px] bg-gray-100'>{productData.props[value]}</div>
        ))}
        <div className="absolute top-0 right-0 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <UpdateItemForm propertyFields={allProps[index]} pID={pIDList[index]} pK={pk}/>
            <button className="bg-red-500 text-white px-4 py-2" onClick={Delete}>Delete</button>
        </div>
    </div>
    )
}

export default ProductTile