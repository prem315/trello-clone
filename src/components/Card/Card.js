import React, { useState, useRef } from "react"
import IconButton from "../IconButton/IconButton"
import EditableInput from "../EditableInput/EditableInput"
import Input from "../Input/input";
import "./Card.scss"

export default function Card({task, editTaskToCard, delteTaskToCard, dragAndDropTask, index, handleDrag, handleDrop}) {
    
    // const deleteTask = () => {
    //     console.log(task, "delete")
    //     delteTaskToCard(task)
    // }
    const [name, setName] = useState("")
    

    const handleChange = (val) => {
        console.log(val)
        editTaskToCard(val, task)
        setName(val)
    }
    
    return(
            <>
            <div 
                className="card" 
                draggable={true}
                onDragOver={(ev) => ev.preventDefault()}
                onDragStart={handleDrag}
                onDrop={handleDrop}
                id={index}
                key={task.id} 
                >
                <div>{task.task}</div>
                
                <div className="buttons">
                    <IconButton icon={"pencil"} handleClick={editTaskToCard} />
                    <IconButton icon={"clear"} handleClick={() => delteTaskToCard(task)} />
                </div>
            </div>
            <EditableInput 
                    text={task.task}
                    placeholder="Write a task name"
                    type="input"
                >
                    <Input 
                        value={task.task}
                        handleTaskInputChange={(e) => handleChange(e, task)}
                    />
                </EditableInput>
            </>
            /* <EditableInput 
                text={task.task}
                placeholder="Write a task name"
                type="input"
            >
                <Input 
                    value={task.task}
                    handleTaskInputChange={(e) => handleChange(e, task)}
                />
            </EditableInput> */
            
    )
}