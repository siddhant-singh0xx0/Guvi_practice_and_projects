import React from 'react'

function Button({count,onClick}) {
  return (
    <button onClick={onClick}>Click Me :{count}</button>
  )
}

export default Button