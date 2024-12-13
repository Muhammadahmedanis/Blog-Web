import React from 'react';
import logo from '/logo4.png';

function Logo({width = "100px"}) {
  return (
    <div>
      <img height={10} width={60} src={logo} alt="" />
    </div>
  )
}

export default Logo