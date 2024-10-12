//Basic Product-Tile for user view with No buy/purchase option - v1.0 

//Available features
//--Image

import React, { useContext , useState } from 'react'
import { PropContext } from '../components/PropContext'
import DescriptionP from './DescriptionP'

const ProductTile_user_no_buy = ({tileprops, productData, features, index}) => {

    const [openState, setOpenState] = useState(false) // state to track of description dialog box open or not

    const {allProps, pIDList} = useContext(PropContext)

    const pk = productData["PK_n"]  //primary key

    const img_paths = productData["images"] //array of image paths

    const viewDescriptionPage = features[3]

    const isPrice = features[0] //check if the price is enabled to be displayed
    const Price = productData["price"]

    return (
    <div className='card relative group shadow-xl bg-white rounded-lg overflow-hidden transistion-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:z-10'
         style={{ width: '300px', margin: '0 15px' }} // Container style
        >
        <div className='w-[300px] h-[300px] bg-gray-300'
              style = {{ backgroundImage: `url('${img_paths[0]}')`, 
                         backgroundSize: 'cover', 
                         backgroundPosition: 'center' }}
        ></div>


        {/* Product Details Section */}
        <div className='relative bg-white hover:bg-gray-100 pt-2'>
            <div className='relative'>
        
                {tileprops.map((value,index)=>(
                <div 
                key={index} 
                className={`w-[300px] h-[auto] pt-[4px] px-[15px] text-sm ${index === 0 ? 'font-bold text-[17px] pb-[0px]' : 'pb-[2px]'}`} //font-bold for title (1st property)
                >
                    {productData.props[value]}
                </div>
                ))}
                {isPrice === 1 &&
                <div className='w-[300px] h-[auto] pt-[4px] px-[15px] text-lg text-green-500 font-semibold'>LKR {Price}</div>
                }

                <div className='w-[300px] h-[10px]'></div>

                {/* View More Button (Centered, Appears on Hover Over Details Section) */}
                {viewDescriptionPage === 1 && //only if description is enabled
                <div 
                    className="absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out bg-gray-100 bg-opacity-40"
                    style={{
                        backdropFilter: 'blur(1px)',
                    }}
                >
                    <button 
                    className="p-2 border border-gray-400 text-sm text-gray-400 rounded-md bg-transparent hover:border-black hover:text-black transition duration-200 ease-in-out"
                    onClick={() => setOpenState(true)}
                    >
                    View More
                    </button>
                </div>}
            </div>
        </div>
        
        {viewDescriptionPage === 1 && <DescriptionP product={productData} props={allProps[index]} openORclose={openState} setOpenState={setOpenState}/>}

    </div>
    )
}

export default ProductTile_user_no_buy