import React from "react"
import Card from "../Card/Card"
import Input from "../Input/input"
import IconButton from "../IconButton/IconButton"
import "./CardList.scss"

export default function CardList({card, addTaskToCard, handleTaskInputChange, taskInput, cardId}) {
    return(
        <div className="cardList" key={card.id}>
            <div className="cardLable">{card.label}</div>
            <div className="cardContainer">
                {
                    card.tasks.map((task) => {
                        return (
                            <Card task={task} key={task.id} />
                        )
                    })
                }

            </div>
            <div className="inputContainer">
                <Input value={taskInput} handleTaskInputChange={(val) => handleTaskInputChange(val, card)} key={cardId} />
                <IconButton icon={"plus"} handleClick={addTaskToCard} key={cardId} />
            </div>
        </div>
    )
}