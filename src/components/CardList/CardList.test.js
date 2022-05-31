import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { v4 as uuidv4 } from "uuid";
import CardList from "./CardList";
import React from "react";
import { mockCardData } from "./mockData";

describe("testing <CardList /> component", () => {
	const mockSetState = jest.fn();

	jest.mock("react", () => ({
		useState: (initial) => [initial, mockSetState],
	}));

	test("should add task to cardList component", () => {
		const mockAddTask = jest.fn();
		const { debug, rerender } = render(
			<CardList
				delteTaskToCard={jest.fn()}
				card={mockCardData}
				cardId=""
				editTaskToCard={jest.fn()}
				dragAndDropTask={jest.fn()}
				editLableChange={jest.fn()}
				editTask={jest.fn()}
				deleteCardList={jest.fn()}
				addTaskToCard={mockAddTask}
			/>
		);

		const addCardButton = screen.getByTestId("add-card-button");
		const taskInput = screen.getByTestId("add-card-input");
		expect(taskInput).toBeInTheDocument();
		fireEvent.change(taskInput, { target: { value: "addingcard" } });
		fireEvent.click(addCardButton);

		expect(mockAddTask).toBeCalledWith("addingcard", mockCardData);
	});

	test("it should match snapshot", () => {
		const MockCard = render(
			<CardList
				delteTaskToCard={jest.fn()}
				card={mockCardData}
				cardId=""
				editTaskToCard={jest.fn()}
				dragAndDropTask={jest.fn()}
				editLableChange={jest.fn()}
				editTask={jest.fn()}
				deleteCardList={jest.fn()}
				addTaskToCard={jest.fn()}
			/>
		);

		expect(MockCard).toMatchSnapshot();
	});
});