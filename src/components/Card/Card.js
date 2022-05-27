import React, { useState, useRef, useEffect } from "react"
import IconButton from "../IconButton/IconButton"
import EditableInput from "../EditableInput/EditableInput"
import Input from "../Input/input";
import "./Card.scss"

export default function Card({task, editTaskToCard, delteTaskToCard, dragAndDropTask, index, handleDrag, handleDrop, editTask}) {
    const [name, setName] = useState("")
    const inputRef = useRef();
    // const [focus, seFocus] = useRef(false)
    
    const handleChange = (val) => {
        
        editTaskToCard(val, task)
        setName(val)
    }

    return(
        <div className="card-block"
            data-testid="card" 
                // className="card" 
                draggable={true}
                onDragOver={(ev) => ev.preventDefault()}
                onDragStart={handleDrag}
                onDrop={handleDrop}
                id={index}
                key={task.id} 
        >
        
            <EditableInput 
                text={task.task}
                placeholder="Write a task name"
                type="input"
                childRef={inputRef}
               
            >
                <Input 
                    
                    ref={inputRef}
                    value={task.task}
                    handleTaskInputChange={(e) => handleChange(e, task)}
                    
                />

            </EditableInput>
            <div className="buttons">
                <IconButton icon={"pencil"} handleClick={() => editTask(task)} disabled={false} />
                <IconButton icon={"clear"} handleClick={() => delteTaskToCard(task)} disabled={false} />
            </div> 
        </div>   
    )
}

