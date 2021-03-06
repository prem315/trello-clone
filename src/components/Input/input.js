import React, { useState, useRef, useEffect } from "react";
import "./input.scss";

const Input = React.forwardRef((props, ref) => {
	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			props.handleTaskInputChange(event.target.value);
			if (props.onKeyPress) {
				props.onKeyPress();
			}
		}
	};

	const currentref = useRef();

	useEffect(() => {
		if (props.isFocus) {
			currentref.current.focus();
		}
	}, [props.isFocus]);

	return (
		<input
			{...props}
			ref={currentref}
			className="inp"
			aria-label="cost-input"
			value={props.value}
			// onChange={handleChange}
			onChange={(e) => props.handleTaskInputChange(e.target.value)}
			onKeyPress={handleKeyPress}
			placeholder={"add task here"}
			autoFocus
		/>
	);
});

export default Input;

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