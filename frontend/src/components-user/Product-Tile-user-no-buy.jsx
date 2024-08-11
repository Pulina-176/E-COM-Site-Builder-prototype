//Basic Product-Tile for user view with No buy/purchase option - v1.0 

//Available features
//--Image

import React, { useContext } from 'react'
import { PropContext } from '../components/PropContext'

const ProductTile_user_no_buy = ({tileprops, productData, features, index}) => {

    const {allProps, pIDList} = useContext(PropContext)

    const pk = productData["PK_n"]  //primary key

    const img_paths = productData["images"] //array of image paths

    return (
    <div className='relative group'>
        <div className='w-[300px] h-[300px] bg-gray-300'
              style = {{ backgroundImage: `url('${img_paths[0]}')`, 
                         backgroundSize: 'cover', 
                         backgroundPosition: 'center' }}
        ></div>
        <div>{features}</div>
        {tileprops.map((value,index)=>(
        <div className='w-[300px] h-[auto] pt-[4px] pb-[0px] px-[8px] bg-gray-100'>{productData.props[value]}</div>
        ))}
    </div>
    )
}

export default ProductTile_user_no_buy