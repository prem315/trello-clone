import React from "react"
import IconButton from "../IconButton/IconButton"
import "./Card.scss"

export default function Card({task, editTaskToCard, delteTaskToCard}) {
    console.log("card", task)
    return(
        <div className="card" >
           <div>{task.task}</div>
           <div className="buttons">
               
               <IconButton icon={"pencil"} handleClick={editTaskToCard} />
               <IconButton icon={"clear"} handleClick={() => delteTaskToCard(task)} />
               
           </div>
        </div>
    )
}