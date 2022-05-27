import React, { useState, useRef, useEffect } from "react"
import "./input.scss"

// const Input = React.forwardRef(({ref, ...props}) => {

//     const [val, setVal] = useState("")
   
//     const handleChange = (e) => {
//         props.handleTaskInputChange(e.target.value)
//         // setVal(e.target.value)
//     }

//     return (
//         <input className="inp" value={props.value} onChange={handleChange} placeholder={"add task here"} />
//     )
// })

// export default React.memo(Input)

const Input = React.forwardRef((props, ref) => {
	console.log(ref)
    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
         
          props.handleTaskInputChange(event.target.value)
          if(props.onKeyPress) {
            props.onKeyPress()
          }
         
        }
	}
	
	// const currentref = useRef()

    // useEffect(() => {
    //     currentref.current.focus()
    // }, [])
    
    return (
        <input 
            ref={ref}
            className="inp" 
            aria-label="cost-input" 
            data-testid="name"
            value={props.value} 
            // onChange={handleChange}
            onChange={(e) => props.handleTaskInputChange(e.target.value)} 
            onKeyPress={handleKeyPress}
            placeholder={"add task here"} 

        />
    )
})

export default Input

// const Input = (props) => {
//     const [val, setVal] = useState("")
   
//     // const handleChange = (e) => {
//     //     props.handleTaskInputChange(e.target.value)
//     //     // setVal(e.target.value)
//     // }

//     return (
//         <input
//             ref={props.ref} 
//             className="inp" 
//             aria-label="cost-input" 
//             data-testid="name"
//             value={props.value} 
//             // onChange={handleChange}
//             onChange={(e) => props.handleTaskInputChange(e.target.value)} 
//             placeholder={"add task here"} />
//     )
// } 

// export default React.memo(Input)