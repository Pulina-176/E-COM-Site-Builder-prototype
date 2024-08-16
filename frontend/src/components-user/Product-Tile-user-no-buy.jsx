//Basic Product-Tile for user view with No buy/purchase option - v1.0 

//Available features
//--Image

import React, { useContext } from 'react'
import { PropContext } from '../components/PropContext'
import DescriptionP from './DescriptionP'

const ProductTile_user_no_buy = ({tileprops, productData, features, index}) => {

    const {allProps, pIDList} = useContext(PropContext)

    const pk = productData["PK_n"]  //primary key

    const img_paths = productData["images"] //array of image paths

    const viewDescriptionPage = features[3]

    const isPrice = features[0] //check if the price is enabled to be displayed
    const Price = productData["price"]

    return (
    <div className='card relative group shadow-xl'>
        <div className='w-[300px] h-[300px] bg-gray-300'
              style = {{ backgroundImage: `url('${img_paths[0]}')`, 
                         backgroundSize: 'cover', 
                         backgroundPosition: 'center' }}
        ></div>
        {tileprops.map((value,index)=>(
        <div 
        key={index} 
        className={`w-[300px] h-[auto] pt-[4px] px-[15px] bg-gray-100 ${index === 0 ? 'font-bold text-[17px] pb-[0px]' : 'pb-[2px]'}`} //font-bold for title (1st property)
        >
            {productData.props[value]}
        </div>
        ))}
        {isPrice === 1 &&
        <div className='w-[300px] h-[auto] pt-[4px] px-[15px] bg-gray-100 text-[24px]'>LKR {Price}</div>
        }

        <div className='w-[300px] h-[10px] bg-gray-100'></div>
        {viewDescriptionPage === 1 && <DescriptionP product={productData} props={allProps[index]}/>}

    </div>
    )
}

export default ProductTile_user_no_buy