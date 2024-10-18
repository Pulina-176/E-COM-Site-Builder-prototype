import React , {useState} from 'react'
import BookService from './BookServiceDialog'

const ServiceCard_user = ({tileprops, serviceData, features, index}) => {

  const [isModalOpen, setModalOpen] = useState(false); // Book Service Modal state
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (visitorInfo, service) => { // In event of 'Book Service' form submission
    // Handle form submission (e.g., send to backend or log it)
    console.log('Visitor Info:', visitorInfo);
    console.log('Requested Service:', service);
  };

  const img_paths = serviceData["images"] //array of image paths

  const viewDescriptionPage = features[2] // check if the description page is enabled to be displayed
  const hasMiniDescription = features[5] // check if the minidescription section is enabled on the service card

  const isPrice = features[0] //check if the price is enabled to be displayed
  const isBook = features[1]
  const Price = serviceData["price"]

  return (
    <div className='card relative group shadow-xl bg-white rounded-lg overflow-hidden transistion-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:z-10'
         style={{ width: '400px', margin: '0 15px' }} // Container style
    >
        <div className='w-[400px] h-[250px] bg-gray-100'
              style = {{ backgroundImage: `url('${img_paths[0]}')`,
                         backgroundSize: 'cover', 
                         backgroundPosition: 'center' }}
        ></div>

        {/* Service Details Section */}
        <div className='relative bg-white pt-2'>
          <div className='relative'>
            {tileprops.map((value,index)=>(
            <div 
                key={index}
                className={`w-[400px] h-[auto] pt-[4px] px-[15px] ' ${index === 0 ? 'font-bold text-lg pb-[0px]' : 'pb-[2px]'}`}
            >
                {serviceData.props[value]}
            </div>
            ))}
            {/* {isPrice === 1 &&
                <div className='w-[400px] h-[auto] pt-[4px] px-[15px] text-lg text-green-500 font-semifold'>LKR {Price}</div>
            } */}

            <div className='w-[400px] h-[2px]'></div>

          </div>
        </div>

        <div className='w-[400px] h-[auto] pt-[2px] pb-[0px] px-[15px] bg-white text-[14px] text-gray-700 leading-relaxed custom-html'> 
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

        {/* Price Section
        {isPrice === 1 && (
            <div className='w-[400px] h-[auto] pt-[10px] pb-[10px] text-center text-2xl font-bold text-black tracking-wide
                            border border-gray-300 mt-4'>
                Rs {Price}
            </div>
        )} */}

        {/* Price & Book Section */}
        {isPrice === 1 && isBook === 1 (
            <div className='w-[400px] h-[auto] flex items-center justify-center pt-[10px] pb-[10px] px-[15px] border border-gray-300 mt-4'>
                <span className='text-2xl font-bold text-black tracking-wide mr-4'>
                    Rs {Price}
                </span>
                <button onClick={handleOpenModal} className="bg-yellow-200 text-gray-600 font-semibold px-6 py-2 text-sm rounded-lg border border-yellow-200 hover:bg-yellow-300 transition-all">
                    Book Now
                </button>
            </div>
        )}

        {/* Book Service Button without a Price specified*/}
        {isBook === 1 && (
          <div className='w-[400px] h-[auto] flex items-center justify-center pt-[10px] pb-[10px] px-[15px] my-2'>
              <button onClick={handleOpenModal} className="bg-green-400 text-black font-semibold px-6 py-2 text-sm rounded-lg border border-green-400 hover:bg-green-50 transition-all">
                  Book Now
              </button>
          </div>
        )}

        {/* Contact Us Modal */}
        <BookService
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          serviceData={serviceData}
          onSubmit={handleSubmit}
        />



    </div>
  )
}

export default ServiceCard_user