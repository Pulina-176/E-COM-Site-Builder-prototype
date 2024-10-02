import React, { useState } from 'react';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="relative bg-gray-700 w-full flex-shrink-0">
              <img
                src={image['imageURL']}
                alt={`Slide ${index}`}
                className="w-full h-64 object-scale-down rounded-md"
              />
              <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-opacity-40 bg-black text-white px-[5px] pt-[0px] pb-[2px] rounded-md'>
                <h5>{image.h5}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Left and right arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white rounded-full p-2"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white rounded-full p-2"
      >
        &#10095;
      </button>

      {/* Dots */}
      {/* <div className="absolute bottom-4 w-full flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-gray-800' : 'bg-gray-400'
            }`}
          ></button>
        ))}
      </div> */}
    </div>
  );
};

export default Carousel;
