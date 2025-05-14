import React from 'react'

// function Inventory(props) {
//   return (
//     <>
//     <div><h2>Inventory</h2></div>
//     <h4>Person details through props</h4>
//     <ul>
//     <li>Name : {props.person.name}</li>
//     <li>Role : {props.person.role}</li>
//     <li>Age : {props.person.age}</li>
//     <li>Weight : {props.size}</li>
//     </ul>    
//     </>
//   )
// }
function Inventory({size,person}) {
  return (
    <>
    <div><h2>Inventory</h2></div>
    <h4>Person details through props</h4>
    <ul>
    <li>Name : {person.name}</li>
    <li>Role : {person.role}</li>
    <li>Age : {person.age}</li>
    <li>Weight : {size}</li>
    </ul>    
    </>
  )
}

export default Inventory