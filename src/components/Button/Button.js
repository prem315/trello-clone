import React, { useState } from "react"
import "./Button.scss"

const Button = (props) => {
    const handleClick = () => {
        props.handleClick()
    }

    const extraClass = props.type === "add-button" ? "button" : "delete-button"  
    return (
        <button className={extraClass} onClick={handleClick} disabled={props.disabled}>
           {props.type === "add-button" ? "+" : null } 
           {props.children}
            {/* {props.type === "add-button" ? "+" : "delete" } */}
        </button>
    )
}

export default Button