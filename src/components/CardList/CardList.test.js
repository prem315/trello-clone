import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { v4 as uuidv4 } from "uuid";
import CardList from "./CardList";
import React from "react";

const mockedHandleChange = jest.fn()

describe("testing <CardList /> component", () => {
	
	const mockSetState = jest.fn();
	
	jest.mock("react", () => ({
		useState: (initial) => [initial, mockSetState],
	}));
	
    test('should add task to cardList component', () => {
        const { debug } = render(<CardList 
            // card = {{
		    //     id: uuidv4(),
		    //     label: "Todo List",
		    //     tasks: [
			//         { id: uuidv4(), task: "task 1" },
			//         { id: uuidv4(), task: "task 2" },
		    //     ],
			// 	//handleTaskInputChange={mockedHandleChange}
	        // }}
			// addTaskToCard={() => {}}
        />);
        const addCardButton = screen.getByTestId("add-card-button")
		const taskInput = screen.getByTestId("add-card-input");
		expect(taskInput).toBeInTheDocument();
		fireEvent.change(taskInput, { target: { value: "addingcard" } });
		fireEvent.click(addCardButton);
		//const newTask = screen.getByTestId("add-card-input");
		//const tasks = screen.getAllByTestId('card');
  		//const task = screen.getByTestId('card');
		//expect(newTask).toBeInTheDocument();
    })

	
});

