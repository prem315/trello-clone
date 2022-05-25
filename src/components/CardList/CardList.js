// import React from "react"
// import Card from "../Card/Card"
// import Input from "../Input/input"
// import IconButton from "../IconButton/IconButton"
// import "./CardList.scss"

// export default function CardList({card, addTaskToCard, handleTaskInputChange, taskInput, delteTaskToCard}) {
//     console.log("id", card.id)
//     return(
//         <div className="cardList" key={card.id}>
//             <div className="cardLable">{card.label}</div>
//             <div className="cardContainer">
//                 {
//                     card.tasks.map((task) => {
//                         return (
//                             <Card task={task} key={task.id} delteTaskToCard={delteTaskToCard} />
//                         )
//                     })
//                 }

//             </div>
//             <div className="inputContainer">
//                 <Input value={taskInput} handleTaskInputChange={(val) => handleTaskInputChange(val,card)} key={card.id} />
//                 <IconButton icon={"plus"} handleClick={addTaskToCard} />
//             </div>
//         </div>
//     )
// }

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
  key
}) {
  const [val, setVal] = useState("");
  const handleChange = (val) => {
    setVal(val);
  };
  const handleAddTaskToCard = (val, card) => {
    addTaskToCard(val, card);
    setVal("");
  };
  return (
    <div className="cardList" key={cardId}>
      <div className="cardLable">{card.label}</div>
      <div className="cardContainer">
        {card.tasks.map((task) => {
          return <Card task={task} key={task.id} />;
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
