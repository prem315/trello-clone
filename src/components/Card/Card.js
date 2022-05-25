import React, { useState } from "react"
import IconButton from "../IconButton/IconButton"
import EditableInput from "../EditableInput/EditableInput"
import Input from "../Input/input";
import "./Card.scss"

export default function Card({task, editTaskToCard, delteTaskToCard}) {
    
    // const deleteTask = () => {
    //     console.log(task, "delete")
    //     delteTaskToCard(task)
    // }
    const [name, setName] = useState("")

    const handleChange = (val) => {
        console.log(val)
        editTaskToCard(val)
        setName(val)
    }


    return(
        <>
            <div className="card" >
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
                    handleTaskInputChange={() => handleChange(task.task)}
                />
            </EditableInput>
        </>
    )
}