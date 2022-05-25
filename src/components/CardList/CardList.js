import React, { useState, useRef } from "react";
import Card from "../Card/Card";
import Input from "../Input/input";
import IconButton from "../IconButton/IconButton";
import "./CardList.scss";

export default function CardList({
    card,
    addTaskToCard,
    handleTaskInputChange,
    taskInput,
    cardId,
    key,
    delteTaskToCard,
    editTaskToCard,
    dragAndDropTask
}) {
    
    const [val, setVal] = useState("");
    const [dragId, setDragId] = useState();
    const [dragCard, setDragCard] = useState("");
    

    const handleDrag = (ev, card) => {
        console.log(card)
        // setDragCard(card)
        setDragCard(card.id); // s
        console.log(card)
        setDragId(ev.currentTarget.id);
        
    };

    const handleDrop = (ev, card, task) => {
       
        const dropId = ev.currentTarget.id
        console.log("drop", dragCard)
        dragAndDropTask(dragId, dropId, card, task, dragCard)
    };

    const handleChange = (val) => {
        setVal(val);
    };
    const handleAddTaskToCard = (val, card) => {
        addTaskToCard(val, card);
        setVal("");
    };
    const delteTaskFromCard = (card, task) => {
        delteTaskToCard(card, task)
    }
    return (
        <div className="cardList" key={cardId}>
            <div className="cardLable">{card.label}</div>
            <div className="cardContainer">
                {card.tasks.map((task, index) => {
                    return <Card
                        index={index} 
                        task={task} 
                        key={task.id} 
                        delteTaskToCard={() => delteTaskFromCard(card, task)} 
                        editTaskToCard={(e) => editTaskToCard(e, card, task)}
                        //dragAndDropTask={(dragItem, dragOverItem, task) => dragAndDropTask(dragItem, dragOverItem, card)}
                        handleDrag={(e) => handleDrag(e, card)}
                        handleDrop={(e) => handleDrop(e, card, task)}
                    />;
                })}
            </div>
            <div className="inputContainer" key={cardId}>
                <Input
                    value={val}
                    handleTaskInputChange={(val) => handleChange(val)}
                    key={cardId}
                />
                <IconButton
                    icon={"plus"}
                    handleClick={() => handleAddTaskToCard(val, card)}
                    key={cardId}
                />
            </div>
        </div>
    );
}
