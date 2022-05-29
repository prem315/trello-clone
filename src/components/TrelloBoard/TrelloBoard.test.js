import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { v4 as uuidv4 } from "uuid";
import TrelloBoard from "./TrelloBoard";
import CardList from "../CardList/CardList";
import React from "react";

describe("testing <TrelloBoard /> component", () => {
	test("should render CardList", () => {
		render(
			<TrelloBoard
			/>
		);
		const cardList = screen.getByTestId("trello-board");
		expect(cardList).toBeInTheDocument();
	});

	const mockSetState = jest.fn();
	
	jest.mock("react", () => ({
		useState: (initial) => [initial, mockSetState],
	}));

	test("should show input", () => {
		const { debug } = render(<TrelloBoard />);
		const addButton = screen.getByTestId("addcardlist-button");
		fireEvent.click(addButton);
		const taskInput = screen.getByTestId("task-entry");
		expect(taskInput).toBeInTheDocument();

	});


	test("after showing input, input value should change and add button should add cardList to cardListData", () => {
		const { debug } = render(<TrelloBoard />);
		const addButton = screen.getByTestId("addcardlist-button");
		fireEvent.click(addButton);
		const taskInput = screen.getByTestId("task-entry");
		expect(taskInput).toBeInTheDocument();
		fireEvent.change(taskInput, { target: { value: "newone" } });
		const addTaskButton = screen.getByTestId("addlist-button");
		fireEvent.click(addTaskButton);
		const newTaskList = screen.getByTestId("newone");
		expect(newTaskList).toBeInTheDocument();
	})

	test("should remove cardList from cardListData", () => {
		const { debug } = render(<TrelloBoard />);
		const removeButton = screen.getByTestId("Doing-delete-button")
		fireEvent.click(removeButton);
		expect(screen.queryByTestId("Doing")).toBeNull();
		
	})

	const mockedHandleChange = jest.fn()

	// test('should add card', () => {
		
    //     const { debug } = render(<CardList 
    //         card = {{
	// 	        id: uuidv4(),
	// 	        label: "Todo List",
	// 	        tasks: [
	// 		        { id: uuidv4(), task: "task 1" },
	// 		        { id: uuidv4(), task: "task 2" },
	// 	        ],
	//         }}
			
			
    //     />);
    //     const addCardButton = screen.getByTestId("Todo List-delete-button")
	// 	const taskInput = screen.getByTestId("Todo List-input");
	// 	expect(taskInput).toBeInTheDocument();
	// 	fireEvent.change(taskInput, { target: { value: "addingcard" } });
	// 	fireEvent.click(addCardButton);

    // })
});

