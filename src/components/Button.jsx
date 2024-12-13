import React from 'react'
import { useDispatch } from 'react-redux';
import { anim } from '../store/authSlice';

function Button({ children, type = "button", bgColor = 'bg-color-600', textColor = 'text-blue-800', className = '', ...props }) {
  const dispatch  = useDispatch()  
  if(children){
    dispatch(anim());
  }
  return (
    <button className={`px-4 py-2 rounded-lg ${bgColor} ${type} ${textColor} ${className}`} {...props}>{ children }</button>
  )
}

export default Button