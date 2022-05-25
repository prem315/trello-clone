import React, { useState } from "react"
import "./input.scss"

const Input = React.forwardRef(({ref, ...props}) => {

    const [val, setVal] = useState("")
   
    const handleChange = (e) => {
        props.handleTaskInputChange(e.target.value)
        // setVal(e.target.value)
    }

    return (
        <input className="inp" value={props.value} onChange={handleChange} placeholder={"add task here"} />
    )
})

export default Input