import React, { useState } from "react";
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
    editTaskToCard
}) {
    const [val, setVal] = useState("");
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
                {card.tasks.map((task) => {
                    return <Card 
                        task={task} 
                        key={task.id} 
                        delteTaskToCard={() => delteTaskFromCard(card, task)} 
                        editTaskToCard={editTaskToCard}
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
