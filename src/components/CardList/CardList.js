import React, { useState, useRef, useEffect } from "react";
import Card from "../Card/Card";
import Input from "../Input/input";
import IconButton from "../IconButton/IconButton";
import EditableInput from "../EditableInput/EditableInput";
import "./CardList.scss";
import Button from "../Button/Button";

export default function CardList({
	card,
	addTaskToCard,
	// handleTaskInputChange,
	// taskInput,
	cardId,
	// key,
	delteTaskToCard,
	editTaskToCard,
	dragAndDropTask,
	editLableChange,
	editTask,
	deleteCardList,
}) {
	useEffect(() => {
		console.log("change in card", card);
	}, [card]);
	const [val, setVal] = useState("");
	const [dragCard, setDragCard] = useState("");

	const handleDrag = (ev, card) => {
		ev.dataTransfer.setData("dragCardId", card.id);
		ev.dataTransfer.setData("dragId", ev.currentTarget.id);
	};

	const handleDrop = (ev, card, task) => {
		const dropId = ev.currentTarget.id;
		const dragcardId = ev.dataTransfer.getData("dragCardId");
		const dragId = ev.dataTransfer.getData("dragId");
		dragAndDropTask(dragId, dropId, card, task, dragcardId);
	};

	const handleChange = (val) => {
		setVal(val);
	};

	const handleAddTaskToCard = (val, card) => {
		addTaskToCard(val, card);
		setVal("");
	};

	const delteTaskFromCard = (card, task) => {
		delteTaskToCard(card, task);
	};

	const handleTitleChange = (val, card) => {
		editLableChange(val, card);
	};

	return (
		<div className="cardList" key={cardId} data-testid={card?.label}>
			<div className="cardLable">
				<EditableInput
					text={card?.label}
					placeholder="Write a task name"
					type="input"
				>
					{/* {card.label} */}
					<Input
						value={card?.label}
						handleTaskInputChange={(val) => handleTitleChange(val, card)}
					/>
				</EditableInput>
			</div>
			<div className="cardContainer">
				{card?.tasks.map((task, index) => {
					return (
						<Card
							index={index}
							task={task}
							key={task.id}
							delteTaskToCard={() => delteTaskFromCard(card, task)}
							// editTaskToCard={(e) => editTaskToCard(e, card, task)}
							editTaskToCard={(val, task) => editTaskToCard(val, card, task)}
							//dragAndDropTask={(dragItem, dragOverItem, task) => dragAndDropTask(dragItem, dragOverItem, card)}
							handleDrag={(e) => handleDrag(e, card)}
							handleDrop={(e) => handleDrop(e, card, task)}
							editTask={editTask}
						/>
					);
				})}
			</div>
			<div className="inputContainer" key={cardId}>
				<Input
					value={val}
					handleTaskInputChange={(val) => handleChange(val)}
					key={cardId}
					onKeyPress={() => handleAddTaskToCard(val, card)}
					data-testid={`add-card-input`}
				/>
				<IconButton
					data-testid={`add-card-button`}
					icon={"plus"}
					handleClick={() => handleAddTaskToCard(val, card)}
					key={cardId}
					disabled={val === "" ? true : false}
				/>
			</div>

			<div className="delete-btn-container">
				<Button
					type="delte"
					handleClick={() => deleteCardList(card)}
					data-testid={`${card?.label}-delete-button`}
				>
					Delete
				</Button>
			</div>
		</div>
	);
}