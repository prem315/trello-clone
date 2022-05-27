import React, { useState } from "react"
import "./Button.scss"

// const Button = React.forwardRef(({ref, ...props}) => {

//     // const [activeTab, setActiveTab] = useState(children[0].props.label);

//     const handleClick = () => {
//         // e.preventDefault();
//         // setActiveTab(clickedTab)
//         props.handleClick()
//     }

//     return (
//         <button className="button" onClick={handleClick}>
//             +
//         </button>
//     )
// })

// export default Button

const Button = (props) => {

    // const [activeTab, setActiveTab] = useState(children[0].props.label);

    const handleClick = () => {
        // e.preventDefault();
        // setActiveTab(clickedTab)
        props.handleClick()
    }

    return (
        <button className="button" onClick={handleClick}>
            +
        </button>
    )
}

export default Button