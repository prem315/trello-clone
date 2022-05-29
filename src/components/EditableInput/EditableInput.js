import React, { useState, useRef, useEffect } from "react";
import "./EditableInput.scss"

const EditableInput = ({
	childRef,
    text,
    type,
    placeholder,
	children,
	isEdit,
	handleSetEdit,
    ...props
}) => {
  
	const [isEditing, setEditing] = useState(false);
	


	const handleKeyDown = (event, type) => {
		// Handle when key is pressed
	};

	useEffect(() => {
		
		if (childRef && childRef.current && isEditing === true) {
		  childRef.current.focus();
		}
	}, [isEditing, childRef]);

	useEffect(() => {
        if (isEdit) {
            setEditing(true)
        }
    }, [isEdit]);



    const handleBlur = () => {

        setEditing(false)

        handleSetEdit(false)

    }

  


    return (
        <section {...props} data-testid="editable-input">
			{isEditing ? (
				<div
					onBlur={handleBlur}
					onKeyDown={e => handleKeyDown(e, type)}
				>
					{children}
				</div>
			) : (
				<div
					onClick={() => setEditing(true)}
				>
					<span>
						{text || placeholder || "Editable content"}
					</span>
				</div>
			)}
        </section>
  	);
};

export default EditableInput;