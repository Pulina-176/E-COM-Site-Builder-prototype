import { HiArrowCircleLeft } from "react-icons/hi";
import React from "react";
import {Link} from 'react-router-dom'

const Backarrow = ({destination = "/"}) => {
  return (
    <div className="flex">
        <Link
        to={destination} className="bg-sky-800 text-white px-4 py-1 rounded-lg w-fit">
            <HiArrowCircleLeft className="text-2x1"></HiArrowCircleLeft>
        </Link>
    </div>
  )
}

export default Backarrow