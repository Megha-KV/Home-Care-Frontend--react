import React from 'react';
import { FaPlus } from "react-icons/fa";
import './Button.css'

function Button() {
  return (
    <div className='card-button'>
        <button className="delete-button" ><FaPlus className="delete-button-icons" /> Delete</button>
        <button className="edit-button" ><FaPlus className="edit-button-icons" />Edit</button>
        <button className="new-button"><FaPlus className="new-button-icons" />New</button>
        <button className="save-next-button" ><FaPlus className="save-next-button-icons" />Save & Next</button>
    </div>
  )
}

export default Button;