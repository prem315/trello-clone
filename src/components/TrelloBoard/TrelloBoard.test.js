import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { v4 as uuidv4 } from "uuid";
import TrelloBoard from "./TrelloBoard";
import React from "react";

describe("testing <TrelloBoard /> component", () => {
	test("should render CardList", () => {
		render(
			<TrelloBoard
			// text={"text"}
			/>
		);

		const cardList = screen.getByTestId("trello-board");
		expect(cardList).toBeInTheDocument();
		//   expect(inputEl).toHaveAttribute("type", "email");
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

		// fireEvent.change(taskInput, { target: { value: "newone" } });
		// const addTaskButton = screen.getByTestId("addlist-button");
		// fireEvent.click(addTaskButton);
		// const newTaskList = screen.getByTestId("newone");
		// expect(newTaskList).toBeInTheDocument();
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
});

// get delete button
// fireEvent (click) on delete button
// getDeletedList