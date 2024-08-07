import React, { useContext } from 'react'
import axios from 'axios'
import UpdateItemForm from './UpdateItemForm'
import { PropContext } from './PropContext'
import CreateDescription from './CreateDescription';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ProductTile = ({tileprops, productData, index, features}) => {  //features is passed into the UpdateItemForm component

    const {allProps, pIDList} = useContext(PropContext)
    console.log("allProps", allProps)
    console.log("pIDList", pIDList)
    console.log("index", index)

    const pk = productData["PK_n"]  //primary key

    const img_paths = productData["images"] //array of image paths

    const isDescription = features[3]  //check if the description page is enabled
    // if isDescription is 1, CreateDescription component will be rendered
    // props in CreateDescription component: 
    //                            product pk_n, product ID

    const PID = productData["ProductID"]


    const Delete = () => {
        const PID= productData["ProductID"]
        axios.delete(`${backendUrl}/products/${PID}/${pk}`)  //uncomment this to enable delete
        location.reload();

        console.log(productData)
    }

    return (
    <div className='relative group'>
        <div className='w-[300px] h-[300px] bg-gray-300'
              style = {{ backgroundImage: `url('https://techgen-store-server.onrender.com/${img_paths[0]}')`, 
                         backgroundSize: 'cover', 
                         backgroundPosition: 'center' }}
        ></div>
        {tileprops.map((value,index)=>(
        <div className='w-[300px] h-[auto] pt-[4px] pb-[0px] px-[8px] bg-gray-100'>{productData.props[value]}</div>
        ))}
        <div className="absolute top-0 right-0 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {isDescription === 1 && <CreateDescription productID={PID} pk_n={pk}/>}
            <UpdateItemForm propertyFields={allProps[index]} ID={pIDList[index]} pK={pk} comType="Product"/>
            <button className="bg-yellow-500 text-white px-4 py-2" onClick={Delete}>Delete</button>
        </div>
    </div>
    )
}

export default ProductTile