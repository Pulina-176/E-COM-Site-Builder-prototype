import React from 'react'

const DropDown = ({index, type, setType}) => {  

    function setSTR(){
        setType((prevTypes) => prevTypes.map((type, i) => (i === index ? "String" : type)));
    }

    function setNUM(){
        setType((prevTypes) => prevTypes.map((type, i) => (i === index ? "Number" : type)));
    }

  return (
    <div>
        <div className="dropdown dropdown-hover">
        <div tabIndex={0} role="button" className="btn-sm py-1 px-5 rounded-[5px] bg-blue-300 m-1">{type[index]}</div>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a onClick={setSTR}>String</a></li>
            <li><a onClick={setNUM}>Number</a></li>
        </ul>
        </div>
    </div>
  )
}

export default DropDown



