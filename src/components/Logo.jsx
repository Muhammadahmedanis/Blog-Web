import React from 'react';
import logo from '/logo3.png';

function Logo({width = "100px"}) {
  return (
    <div>
      <img height={10} width={70} src={logo} alt="" />
    </div>
  )
}

export default Logo