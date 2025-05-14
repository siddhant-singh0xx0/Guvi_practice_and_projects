import React,{useState} from 'react'

function Counter() {
    const [count,setCount]=useState(0)
    function Increment(){
        setCount(count+1)
    }
    function Mybutton({count,onClick}){
        return (
            <button onClick={onClick}>Click Me :{count}</button>
        )
    }
  return (
    <>
    <div>Counter</div>
    {/* <button onClick={Increment}>Click ME : {count}</button>
    <button onClick={Increment}>Click ME : {count}</button> */}
    </>
  )
}

export default Counter