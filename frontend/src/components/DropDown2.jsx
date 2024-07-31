// This dropdown gets options as a prop, and gets filtered based on the selected values

import React, {forwardRef} from 'react';

const DropDown2 = forwardRef(({index, options, selectedValues, setSelectedValues}, ref) => {

    const handleSelect = (value) => {
        setSelectedValues((prevValues) => {
            const newValues = [...prevValues];
            newValues[index] = value;
            return newValues;
        })
    }

    const handleClear = () => {
        setSelectedValues((prevValues) => {
            const newValues = [...prevValues];
            newValues[index] = '';
            return newValues;
        })
    }

    const filteredOptions = options.filter(
        (option) => !selectedValues.includes(option) || selectedValues[index] === option
    )

    return(
        <div>
            <div className="dropdown dropdown-hover">
                <div ref={ref} tabIndex={0} role='button' className='btn-sm py-1 px-5 rounded-[5px] text-white bg-[#34A853] m-1'>
                        {selectedValues[index] || 'Select field'}
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    {filteredOptions.map((option, ind) => (
                        <li key={ind}>
                            <a onClick={() => handleSelect(option)}>{option}</a>
                        </li>
                    ))}
                    <li>
                        <a onClick={handleClear}>Clear field</a>
                    </li>
                </ul>

            </div>
        </div>
    )

})

export default DropDown2

