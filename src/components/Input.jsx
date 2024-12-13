import React, {forwardRef, useId} from 'react';

const Input = forwardRef(function Input({label, icon, type = "text",  clasName = "", ...props}, ref) {
    const id = useId();
    return ( <div className="flex items-center border-b-2 border-gray-300 py-2">
        {/* { label && <label className='inline-block mb-1 pl-1' htmlFor={id}></label> } */}
        <i className="text-[#dc8850]"> {icon} </i>
        <input type={type} className={`ml-3 placeholder-[#dc8850] bg-[rgb(235,221,183)] focus:outline-none focus:border-blue-500 ${clasName}`} ref={ref} {...props} id={id} />
    </div> )
})

// w-full p-2

//  is use here for accessbility purpose

// function Input({}) {
//     const id = useId();
//   return (
//     <div>Input</div>
//   )
// }        
export default Input