import React, {forwardRef, useId} from 'react';

const Input = forwardRef(function Input({label, icon, type = "text",  clasName = "", ...props}, ref) {
    const id = useId();
    return ( <div className="flex items-center border-b-2 border-[#dcca95] py-2">
        <i className="text-[#966a38]"> {icon} </i>
        <input type={type} className={`ml-3 placeholder-[#966a38] bg-[rgb(235,221,183)]  focus:outline-none focus:bg-[rgb(235,221,183)]  ${clasName}`} ref={ref} {...props} id={id} />
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