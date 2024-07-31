import React from 'react'
import { useState } from 'react'

const DropDown3 = ({values, setComType}) => {    //setComType works for any types of values (error in naming convention)
    
    const [val, setVal] = useState("Select Type")

    function changeVal(str){
        setVal(str)
        setComType(str)
    }

  return (
    <div>
        <div className="dropdown dropdown-hover">
        <div tabIndex={0} role="button" className="btn-sm py-1 px-5 rounded-[5px] bg-blue-300 m-1">{val}</div>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
           {values.map((value)=>(<>
                        <li><a onClick={()=>changeVal(value)}>{value}</a></li>
           </>)
           )}
        </ul>
        </div>
    </div>
  )
}

export default DropDown3