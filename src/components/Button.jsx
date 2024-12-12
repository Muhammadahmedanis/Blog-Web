import React from 'react'
import { useDispatch } from 'react-redux'
const dispatch  = useDispatch()  

function Button({ children, type = "button", bgColor = 'bg-color-600', textColor = 'text-blue-800', className = '', ...props }) {
  dispatch(aniamtion())
  return (
    <button className={`px-4 py-2 rounded-lg ${bgColor} ${type} ${textColor} ${className}`} {...props}>{ children }</button>
  )
}

export default Button