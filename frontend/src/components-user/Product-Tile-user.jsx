//Basic Product-Tile for user view. v1.0

//Available features
//--Image
//--Buy-book option

import React, { useContext } from 'react'
import { PropContext } from '../components/PropContext'
import DescriptionP from './DescriptionP'

import { useSelector , useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../stores/cart';

const ProductTile_user = ({tileprops, productData, features, index, PID}) => { //tileprops: properties to display in the tile, productData: data of the product, features: features of the product card type, index: index of the product in the product list

    const carts = useSelector(store => store.cart);
    const dispatch = useDispatch();
    
    const {allProps, pIDList} = useContext(PropContext) //allProps: all properties of the product, pIDList: list of product IDs

    const pk = productData["PK_n"]  //primary key

    const img_paths = productData["images"] //array of image paths\
    const cartImage = img_paths[0] // This will be the image displayed when added to the cart

    const viewDescriptionPage = features[3]

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
    <div className='card relative group shadow-xl'>
        <div>
        <div className='w-[300px] h-[300px] bg-gray-300'
              style = {{ backgroundImage: `url('${img_paths[0]}')`, 
                         backgroundSize: 'cover', 
                         backgroundPosition: 'center' }}
        ></div>
        </div>

        {tileprops.map((value, index) => (
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

        <div className="absolute right-0 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
                className="bg-gray-300 p-2 rounded-md text-sm hover:bg-gray-400"
                onClick={handleAddToCart}>    
                    Add to Cart
            </button>
            <button 
                className="bg-gray-300 p-2 rounded-md text-sm hover:bg-gray-400"
                onClick={handleRemoveFromCart}>    
                    Remove
            </button>
        </div>
        {viewDescriptionPage === 1 && <DescriptionP product={productData} props={allProps[index]}/>}
        
    </div>
    )
}

export default ProductTile_user


//Basic Product-Tile for user view v2.0
