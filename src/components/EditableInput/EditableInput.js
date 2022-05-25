import React, { useState } from "react";
import "./EditableInput.scss"

const EditableInput = ({
  text,
  type,
  placeholder,
  children,
  ...props
}) => {
  
  const [isEditing, setEditing] = useState(false);


  const handleKeyDown = (event, type) => {
    // Handle when key is pressed
  };


    return (
        <section {...props}>
        {isEditing ? (
            <div
            onBlur={() => setEditing(false)}
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