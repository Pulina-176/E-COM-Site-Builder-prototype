import React from 'react';

const SavingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center justify-center">
        <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        <div className="text-white text-xl mt-4">Saving...</div>
      </div>
    </div>
  );
}

export default SavingSpinner;
