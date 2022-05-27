// import React from "react"
import Button from "../Button/Button";
import "./TrelloBoard.scss";
import CardList from "../CardList/CardList";
import Input from "../Input/input";
import { throttle } from "../../utils/utils";
import { v4 as uuidv4 } from "uuid";

import React, { useState, useRef } from "react";

const INITIAL_STATE = [
	{
		id: uuidv4(),
		label: "Todo List",
		tasks: [
			{ id: uuidv4(), task: "task 1" },
			{ id: uuidv4(), task: "task 2" },
		],
	},
	{
		id: uuidv4(),
		label: "Doing",
		tasks: [
			{ id: uuidv4(), task: "task 3" },
			{ id: uuidv4(), task: "task 4" },
		],
	},
];
const TrelloBoard = () => {
	const [list, setList] = useState(INITIAL_STATE);
	const [taskInput, setTaskInput] = useState("");
	const [currentCardId, setCurrentCardId] = useState(null);
	const [inputVisible, setInputVisible] = useState(false);
	const [label, setLabel] = useState("");
	const [isFocus, setIsFocus] = useState(false);

	const inputRef = useRef(null);

	const addCardList = () => {
		setInputVisible(true);
		setIsFocus(true);
	};

	const addTaskToCard = (val, selectedCard) => {
		const newList = list.map((card) => {
			if (card.id === selectedCard.id) {
				return {
					...card,
					tasks: [...card.tasks, { id: uuidv4(), task: val }],
				};
			} else {
				return card;
			}
		});
		setList(newList);
		setTaskInput("");
	};

	const delteTaskToCard = (selectedCard, selectedTask) => {
		const newList = list.map((card) => {
			if (card.id === selectedCard.id) {
				return {
					...card,
					tasks: card.tasks.filter((task) => {
						return task.id !== selectedTask.id;
					}),
				};
			} else {
				return card;
			}
		});
		setList(newList);
	};

	const editTaskToCard = (val, selectedCard, selectedTask) => {
		const newList = list.map((card) => {
			if (card.id === selectedCard.id) {
				return {
					...card,
					tasks: card.tasks.map((currentTask) => {
						if (currentTask.id === selectedTask.id) {
							return {
								...currentTask,
								task: val,
							};
						} else {
							return currentTask;
						}
					}),
				};
			} else {
				return card;
			}
		});
		setList(newList);
	};

	const handleTaskInputChange = (val, card) => {
		setTaskInput(val);
		setCurrentCardId(card.id);
	};

	const dragAndDropTask = (
		dragItem,
		dragOverItem,
		selectedCard,
		selectedTask,
		dragCardId
	) => {
		const copyListItems = [...list];
		const selectedList = copyListItems.find((list) => {
			return list.id === selectedCard.id;
		}).tasks;

		if (dragCardId === selectedCard.id) {
			const dragItemContent = selectedList[dragItem];
			selectedList.splice(dragItem, 1);
			selectedList.splice(dragOverItem, 0, dragItemContent);

			const newList = list.map((card) => {
				if (card.id === selectedCard.id) {
					return {
						...card,
						tasks: selectedList,
					};
				} else {
					return card;
				}
			});
			setList(newList);
		} else {
			// const selected
			const selectedList = copyListItems.find((list) => {
				return list.id === dragCardId;
			}).tasks;
			const dragItemContent = selectedList[dragItem];
			selectedList.splice(dragItem, 1);

			// remove from selectedlist
			// drop list tasks
			const dropListTasks = copyListItems.find((list) => {
				return list.id === selectedCard.id;
			}).tasks;
			dropListTasks.splice(dragOverItem, 0, dragItemContent);

			const newList = list.map((card) => {
				if (card.id === dragCardId) {
					return {
						...card,
						tasks: selectedList,
					};
				} else if (card.id === selectedCard.id) {
					return {
						...card,
						tasks: dropListTasks,
					};
				}
			});
			setList(newList);
		}
	};

	const editLableChange = (val, selectedCard) => {
		const newList = list.map((card) => {
			if (card.id === selectedCard.id) {
				return {
					...card,
					label: val,
				};
			} else {
				return card;
			}
		});
		setList(newList);
	};

	const handleInputChange = (val) => {
		setLabel(val);
	};

	const addListToCardList = () => {
		const newList = [...list, { id: uuidv4(), label: label, tasks: [] }];
		setList(newList);
		setInputVisible(false);
		setLabel("");
	};

	const editTask = () => {};

	const deleteCardList = (cardList) => {
		const newList = list.filter((listItem) => {
			return listItem.id !== cardList.id;
		});
		setList(newList);
	};

	return (
		<div className="trelloBoard" data-testid="trello-board">
			<div className="cardListContainer">
				{list.map((data) => {
					return (
						<CardList
							card={data}
							addTaskToCard={addTaskToCard}
							handleTaskInputChange={handleTaskInputChange}
							taskInput={taskInput}
							delteTaskToCard={delteTaskToCard}
							editTaskToCard={editTaskToCard}
							editTask={editTask}
							dragAndDropTask={dragAndDropTask}
							editLableChange={editLableChange}
							deleteCardList={deleteCardList}
							key={data.id}
						/>
					);
				})}
				{inputVisible === true ? (
					<div className="addcardList">
						<Input
							data-testid="task-entry"
							ref={inputRef}
							handleTaskInputChange={handleInputChange}
							onKeyPress={addListToCardList}
							isFocus={isFocus}
						/>
						<Button
							data-testid="addlist-button"
							type={"add-button"}
							handleClick={addListToCardList}
							disabled={label === "" ? true : false}
						/>
					</div>
				) : (
					<Button
						handleClick={addCardList}
						type={"add-button"}
						data-testid="addcardlist-button"
					/>
				)}
			</div>
		</div>
	);
};

export default TrelloBoard;