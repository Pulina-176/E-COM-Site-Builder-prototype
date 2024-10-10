// //Description page component for Product commodities.

// import React from 'react'
// import { useState , useEffect} from 'react'
// import { Dialog, DialogBackdrop, DialogPanel, Radio, RadioGroup } from '@headlessui/react'
// import { IoCloseCircle } from "react-icons/io5";

// //import { XMarkIcon } from '@heroicons/react/24/outline'


// const DescriptionP = ({product, props}) => {
    
//   const [open, setOpen] = useState(false)

//   return (
//     <>
//     <button className="bg-blue-500 text-white px-4 py-2" onClick={()=>setOpen(true)}>View more</button>

    
//       <Dialog open={open} onClose={()=>setOpen(false)} className="relative z-10">
//         <DialogBackdrop
//           transition
//           className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block"
//         />

//         <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//           <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
//             <DialogPanel
//               transition
//               className="flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl"
//             >
//               <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
//                 <button
//                   type="button"
//                   onClick={() => setOpen(false)}
//                   className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
//                 >
//                   <span className="sr-only">Close</span>
//                   <IoCloseCircle className='text-2xl'/>
//                 </button>

//                 <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
//                   <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
//                     <img alt={"image not loading"} src={`${product.images[0]}`} className="object-cover object-center" />
//                   </div>
//                   <div className="sm:col-span-8 lg:col-span-7">
//                     <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{product.props[props[0]]}</h2>

//                     <section aria-labelledby="information-heading" className="mt-2">
//                       <h3 id="information-heading" className="sr-only">
//                         Product information
//                       </h3>

//                       <p className="text-2xl text-gray-900">LKR {product.price}</p>

                      
//                     </section>

//                     <section aria-labelledby="options-heading" className="mt-10">

//                     <div className="space-y-4">
//                       {Object.keys(product.props).slice(1).map((key, index) => (
//                         <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//                           <span className="text-sm font-medium text-gray-900 sm:w-1/3">{key}:</span>
//                           <span className="text-sm text-gray-700 sm:w-2/3 break-words">{product.props[key]}</span>
//                         </div>
//                       ))}
//                     </div>

//                     <section aria-labelledby="information-heading" className="mt-2">
//                       <div className="relative z-10 custom-html" dangerouslySetInnerHTML={{ __html: product.description }} />
//                       <style jsx>{`
//                         .custom-html ul {
//                           list-style-type: disc;
//                           margin-left: 20px;
//                           padding-left: 20px;
//                         }
//                         .custom-html p {
//                           margin-bottom: 2px;
//                           margin-top: 3px;
//                           color: #333;
//                         }
//                         .custom-html li {
//                           margin-bottom: 0px;
//                           color: #555;
//                         }
//                     `}</style>
//                     </section>

                      
//                       <form>
//                         <button
//                           type="submit"
//                           className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                         >
//                           Add to bag
//                         </button>
//                       </form>
//                     </section>

//                   </div>
//                 </div>
//               </div>
//             </DialogPanel>
//           </div>
//         </div>
//       </Dialog>

    
    
//   </>
//   )
// }

// export default DescriptionP



import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { IoCloseCircle } from "react-icons/io5";
import { addToCart, removeItem } from '../stores/cart';

const DescriptionP = ({ product, props }) => {
  const [open, setOpen] = useState(false);

  // Redux hooks to dispatch actions and access cart state
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  // Check if the item is already in the cart
  const isItemInCart = cartItems.some(item => item.productId === product.id);

  // Handler for adding/removing item
  const handleAddRemoveItem = () => {
    if (isItemInCart) {
      dispatch(removeItem({ productId: product.id }));
    } else {
      dispatch(addToCart({
        productId: product.id,
        image: product.images[0],
        title: product.props[props[0]],
        quantity: 1,
        price: product.price,
      }));
    }
  };

  return (
    <>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition ease-in-out duration-300" onClick={() => setOpen(true)}>
        View More
      </button>

      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center px-2 lg:px-4">
            <DialogPanel
              transition
              className="w-full max-w-4xl transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition duration-300"
              >
                <span className="sr-only">Close</span>
                <IoCloseCircle className='text-2xl' />
              </button>

              <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Product Image */}
                <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100">
                  <img alt="Product" src={product.images[0]} className="object-cover object-center" />
                </div>

                {/* Product Details */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{product.props[props[0]]}</h2>
                  <p className="mt-3 text-lg font-semibold text-gray-900">LKR {product.price}</p>

                  <div className="mt-6 space-y-4">
                    {Object.keys(product.props).slice(1).map((key, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-900">{key}:</span>
                        <span className="text-sm text-gray-600">{product.props[key]}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 relative z-10 custom-html" dangerouslySetInnerHTML={{ __html: product.description }} />
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
                      margin-bottom: 0px;
                      color: #555;
                    }
                  `}</style>

                  {/* Add/Remove from Cart Button */}
                  <button
                    type="button"
                    onClick={handleAddRemoveItem}
                    className={`mt-8 w-full flex justify-center items-center rounded-md px-8 py-3 text-base font-medium text-white ${isItemInCart ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'} transition duration-300 ease-in-out`}
                  >
                    {isItemInCart ? 'Remove from Bag' : 'Add to Bag'}
                  </button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default DescriptionP;
