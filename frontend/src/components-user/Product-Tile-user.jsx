//Basic Product-Tile for user view. v1.0

//Available features
//--Image
//--Buy-book option
//--Go To Description Page

import React, { useState , useContext } from 'react'
import { PropContext } from '../components/PropContext'
import DescriptionP from './DescriptionP'
import { HiOutlineShoppingCart } from 'react-icons/hi';

import { useSelector , useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../stores/cart';

const ProductTile_user = ({tileprops, productData, features, index, PID}) => { //tileprops: properties to display in the tile, productData: data of the product, features: features of the product card type, index: index of the product in the product list

    const carts = useSelector(store => store.cart);
    const dispatch = useDispatch();

    const [openState, setOpenState] = useState(false) // state to track of description dialog box open or not
    
    const {allProps, pIDList} = useContext(PropContext) //allProps: all properties of the product, pIDList: list of product IDs

    const pk = productData["PK_n"]  //primary key

    const img_paths = productData["images"] //array of image paths\
    const cartImage = img_paths[0] // This will be the image displayed when added to the cart

    const viewDescriptionPage = features[3]  // check if the description page is enabled to be displayed

    const isPrice = features[0] //check if the price is enabled to be displayed
    const Price = productData["price"]

    const productId = PID+"$"+pk

    const handleAddToCart = () => {
        dispatch(addToCart({
            productId: productId,
            quantity: 1,
            title: productData.props[tileprops[0]],
            price: Price,
            image: cartImage
        }))
        console.log(carts)
    }

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart({
            productId: productId,
            quantity: 1,
        }))
    }

    return (
    <div className='card relative group shadow-xl bg-white rounded-lg overflow-hidden transistion-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:z-10'
         style={{ width: '300px', margin: '0 15px' }} // Container style
    >
        <div className='w-[300px] h-[300px] bg-gray-100'
              style = {{ backgroundImage: `url('${img_paths[0]}')`, 
                         backgroundSize: 'cover', 
                         backgroundPosition: 'center' }}
        ></div>

        {/* Product Details Section */}
        <div className='relative bg-white hover:bg-gray-100 pt-2'>
            <div className='relative'>
                {tileprops.map((value, index) => (
                <div 
                    key={index} 
                    className={`w-[300px] h-[auto] pt-[4px] px-[15px] text-sm ${index === 0 ? 'font-bold text-lg pb-[0px]' : 'pb-[2px]'}`} //font-bold for title (1st property)
                >
                    {productData.props[value]}
                </div>
                ))}
                {isPrice === 1 &&
                <div className='w-[300px] h-[auto] pt-[4px] px-[15px] text-lg text-green-500 font-semifold'>LKR {Price}</div>
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

        {/* Add to cart button section */}
        <div className="p-4 border-t border-gray-200 flex justify-center">
            <button 
            className="bg-gray-100 hover:bg-gray-200 text-black px-6 py-2 rounded-md text-sm flex items-center justify-center space-x-2 transition-all duration-200"
            onClick={handleAddToCart} 
            >
            <HiOutlineShoppingCart className='text-lg' />
            <span>Add to Cart</span>
            </button>
        </div>
        {viewDescriptionPage === 1 && <DescriptionP product={productData} props={allProps[index]} openORclose={openState} setOpenState={setOpenState}/>}
        
    </div>
    )
}

export default ProductTile_user


//Basic Product-Tile for user view v2.0
