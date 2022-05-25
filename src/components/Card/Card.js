import React from "react"
import IconButton from "../IconButton/IconButton"
import "./Card.scss"

export default function Card({task, editTaskToCard, delteTaskToCard}) {
    console.log("card", task)
    return(
        <div className="card" key={task.id}>
           <div>{task.task}</div>
           <div className="buttons">
               
               <IconButton icon={"pencil"} handleClick={editTaskToCard} />
               <IconButton icon={"clear"} handleClick={delteTaskToCard} />
               
           </div>
        </div>
    )
}