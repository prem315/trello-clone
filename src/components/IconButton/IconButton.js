import React, { useState } from "react"
import "./IconButton.scss"
import clear from "../../assets/clear.png";
import edit from "../../assets/pencil.png";
import plus from "../../assets/plus.png";

const IconButton = React.forwardRef(({ref, ...props}) => {

   
    const handleClick = () => {
        props.handleClick()
    }

    //const data = props.icon === "pencil" ? edit : clear 
    let data;
    if(props.icon === "pencil") {
        data = edit
    } else if(props.icon === "clear") {
        data = clear
    } else if(props.icon === "plus") {
        data = plus
    }

    return (
        <img className="image-button" src={data} alt={props.icon} onClick={handleClick} />
    )
})

export default IconButton