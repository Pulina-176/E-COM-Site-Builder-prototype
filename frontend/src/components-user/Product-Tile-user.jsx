//Basic Product-Tile for user view. v1.0

//Available features
//--Image
//--Buy-book option

import React, { useContext } from 'react'
import { PropContext } from '../components/PropContext'

const ProductTile_user = ({tileprops, productData, features, index}) => {

    const {allProps, pIDList} = useContext(PropContext)

    const pk = productData["PK_n"]  //primary key

    const img_paths = productData["images"] //array of image paths

    return (
    <div className='card relative group shadow-xl'>
        <div className='w-[300px] h-[300px] bg-gray-300'
              style = {{ backgroundImage: `url('/public/images/${img_paths[0]}')`, 
                         backgroundSize: 'cover', 
                         backgroundPosition: 'center' }}
        ></div>

        {tileprops.map((value, index) => (
        <div 
            key={index} 
            className={`w-[300px] h-[auto] pt-[4px] px-[15px] bg-gray-100 ${index === 0 ? 'font-bold text-[17px] pb-[0px]' : 'pb-[2px]'}`} //font-bold for title (1st property)
        >
            {productData.props[value]}
        </div>
        ))}
        <div className='w-[300px] h-[10px] bg-gray-100'></div>

        <div className="absolute top-0 right-0 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-red-500 text-white px-4 py-2">Buy</button>
        </div>
    </div>
    )
}

export default ProductTile_user