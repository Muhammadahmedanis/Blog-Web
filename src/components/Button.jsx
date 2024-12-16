import React from 'react'

function Button({ children, type = "button", bgColor = '', textColor = '', className = '', ...props }) {
  return (
    <button className={`px-4 py-2 rounded-lg ${bgColor} ${type} ${textColor} ${className}`} {...props}>{ children }</button>
  )
}

export default Button